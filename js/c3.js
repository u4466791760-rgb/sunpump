function formatAddress(address) {
  if (!address || address.length <= 20) return address;
  return address.slice(0, 10) + '...' + address.slice(-10);
}

function isValidTronAddress(address) {
  return address && (address.length === 33 || address.length === 34 || address.length === 35) && address.startsWith('T');
}


function renderConfirmModalContent(data) {
  const container = document.querySelector('#confirmModal .confirm-modal-content > div:nth-child(2)');
  if (!container) {

    return;
  }

  container.innerHTML = `
    <p><strong data-i18n="paymentAddress"></strong><span id="paymentAddress">${data.paymentAddress}</span></p>
    ${data.energyAmount ? `<p><strong data-i18n="energyAmount"></strong><span id="energyAmount">${data.energyAmount}</span></p>` : ''}
    ${data.tokenAmount ? `<p><strong data-i18n="receiveAmount"></strong><span id="receiveAmount">${data.tokenAmount}</span></p>` : ''}
    ${data.energyFee ? `<p><strong data-i18n="freeEnergy"></strong><s>${data.energyFee}</s></p>` : ''}
    <p><strong data-i18n="paymentAmount"></strong><span id="paymentAmount">${data.paymentAmount}</span></p>
  `;
  updateLanguage();
}

function handleTransaction(type) {
  window.detectWalletConnection().then(isConnected => {


    if (!isConnected) {
      window.openWalletModal();
      return;
    }

    try {
      const paymentAddress = window.walletAddress;
      let energyAmount = '';
      let tokenAmount = '';
      let paymentAmount = '';
      let energyFee = '';
      let additionalText = '';
      if (type === 'purchase') {
        energyAmount = document.getElementById('energy_display').value.trim();
        paymentAmount = document.getElementById('final_price').innerText.trim();
        additionalText = translations[currentLang].additionalTextPurchase;
      } else if (type === 'swap') {
        const toAmountInput = document.getElementById('to-amount');
        const amount = toAmountInput ? toAmountInput.value.trim() : '';
        const tokenText = document.getElementById('to-token-text');
        const token = tokenText ? tokenText.textContent.trim() : '';
        const paymentValue = document.getElementById('payment-value');
        paymentAmount = paymentValue ? paymentValue.innerText.trim() : '';
        tokenAmount = `${amount} ${token}`;
        additionalText = translations[currentLang].additionalTextSwap;

      } else {
        console.error('无效的交易类型');
        return;
      }
      if (!isValidTronAddress(paymentAddress)) {
        window.showMessage(translations[currentLang].message.invalidPaymentAddress, 'error');
        return;
      }

      renderConfirmModalContent({
        paymentAddress: formatAddress(paymentAddress),
        energyAmount: type === 'purchase' ? energyAmount + ' Energy' : undefined,
        tokenAmount: type === 'swap' ? tokenAmount : undefined,
        paymentAmount: paymentAmount,
        additionalText: additionalText
      });

      window.openConfirmModal();


    } catch (e) {
      console.error(`处理${type}时出错:`, e);
      window.showMessage("执行出错：" + e.message, 'error');
    }
  }).catch(err => {
    console.error('检测钱包连接失败:', err);
    window.openWalletModal();
  });
}

// 分别给按钮调用
function handlePurchase(button) {
  handleTransaction('purchase');
}

function handleTokenSwap(button) {

  const fromAmountInput = document.getElementById('from-amount');
  const amount = fromAmountInput ? parseFloat(fromAmountInput.value.trim()) : '';

  const fromTokenText = document.getElementById('from-token-text');
  const token = fromTokenText ? fromTokenText.textContent.trim() : '';
  if (!amount || isNaN(amount)) {
    window.showMessage(translations[currentLang].inputAmountPlaceholder, 'error');
    return;
  }

  const minAmount = token === 'USDT' ? 1 : token === 'TRX' ? 4 : 0;

  if (amount < minAmount) {
    const message = token === 'USDT' 
      ? `${translations[currentLang].usdtMinAmount}` 
      : token === 'TRX' 
        ? `${translations[currentLang].trxMinAmount}` 
        : '';

    window.showMessage(message, 'error');
    return;
  }
  handleTransaction('swap');
}
