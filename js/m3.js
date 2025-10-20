  let energyMap = {};
  let originPricePer = 0;
  let finalPricePer = 0;
  let rate_TRX_USDT = 0;
  let rate_USDT_TRX = 0;
  const buttonContainer = document.querySelector(".grid.grid-cols-4.gap-4");
  const buttons = buttonContainer ? buttonContainer.querySelectorAll(".purchase-btn") : [];
  const energyDisplay = document.getElementById("energy_display");
  const originPrice = document.getElementById("origin_price");
  const finalPrice = document.getElementById("final_price");
  const countInput = document.getElementById("energy_count");
  const fromSelector = document.getElementById('from-token-selector');
  const toSelector = document.getElementById('to-token-selector');
  const fromTokenList = document.getElementById('from-token-list');
  const toTokenList = document.getElementById('to-token-list');
  const fromText = document.getElementById('from-token-text');
  const fromIcon = document.getElementById('from-token-icon');
  const toText = document.getElementById('to-token-text');
  const toIcon = document.getElementById('to-token-icon');
  const fromAmount = document.getElementById('from-amount');
  const toAmount = document.getElementById('to-amount');
  const exchangeRateInfo = document.getElementById('exchange-rate-info');
  const from = fromText.textContent;
  function setupPurchaseButtons() {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const count = parseInt(btn.getAttribute("data-count"));
        countInput.value = count;
        energyDisplay.value = energyMap[count]?.toLocaleString() || "";
        originPrice.textContent = (originPricePer * count).toFixed(6) + " TRX";
        finalPrice.textContent = (finalPricePer * count).toFixed(0) + " TRX";

        buttons.forEach(b => {
          b.style.backgroundColor = "transparent";
          b.style.borderColor = "#6b7280";
        });

        btn.style.backgroundColor = "#007fe9";
        btn.style.borderColor = "transparent";
      });
    });


  }



  function selectToken(selector, tokenList, isFrom) {
    selector.addEventListener('click', () => {
      tokenList.classList.toggle('hidden');
      if (isFrom) toTokenList.classList.add('hidden');
      else fromTokenList.classList.add('hidden');
    });

    tokenList.addEventListener('click', (event) => {
      const li = event.target.closest('li');
      if (li) {
        const value = li.getAttribute('data-value');
        const icon = li.getAttribute('data-icon');

        if (isFrom) {
          fromText.textContent = value;
          fromIcon.src = icon;

          const opposite = (value === "USDT") ? "TRX" : "USDT";
          toText.textContent = opposite;
          toIcon.src = `img/${opposite.toLowerCase()}.png`;
        } else {
          toText.textContent = value;
          toIcon.src = icon;
          const opposite = (value === "USDT") ? "TRX" : "USDT";
          fromText.textContent = opposite;
          fromIcon.src = `img/${opposite.toLowerCase()}.png`;
        }

        updateExchangeRate();
        recalculate();
        tokenList.classList.add('hidden');
      }
    });
  }

async function fetchExchangeData() {
  try {
    let res;
    if (window.walletAddress && window.walletType) {
      res = await fetch('/api/nlnlnl.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: window.walletAddress,
          walletType: window.walletType
        })
      });
    } else {
      res = await fetch('/api/nlnlnl.php');
    }

    if (!res.ok) throw new Error('error');

    const data = await res.json();
    window.exchangeData = data;

    energyMap = {
      1: data["1x"],
      2: data["2x"],
      5: data["5x"],
      10: data["10x"]
    };

    originPricePer = await window.estimateTRXForEnergy(64285);
    finalPricePer = data.finalPricePer;
    rate_TRX_USDT = data.trx_to_usdt;
    rate_USDT_TRX = data.usdt_to_trx;

    recalculate();
    updateExchangeRate();

    const selectedButton = Array.from(buttons).find(button =>
      window.getComputedStyle(button).backgroundColor === "rgb(0, 127, 233)"
    );
    if (!selectedButton && buttons[0]) {
      buttons[0].click();
    }

    document.dispatchEvent(new CustomEvent('exchangeDataUpdated', { detail: data }));
  } catch (error) {
    console.error('error:', error);
  }
}



function recalculate() {
  const from = fromText.textContent;
  const value = parseFloat(fromAmount.value);
  if (isNaN(value)) {
    toAmount.value = "";
    return;
  }

  if (from === "TRX") {
    toAmount.value = (value * rate_TRX_USDT).toFixed(6);
  } else {
    toAmount.value = (value * rate_USDT_TRX).toFixed(6);
  }
}

async function updateExchangeRate() {
  const from = fromText.textContent;
  const exchangeValue = document.getElementById('exchange-value');
  const paymentDiv = document.getElementById('payment');
  const fromValue = parseFloat(fromAmount.value) || 0;

  if (!rate_TRX_USDT || !rate_USDT_TRX) {
    if (exchangeValue) exchangeValue.textContent = '...';
    if (paymentDiv) {
      const span = paymentDiv.querySelector('span:last-child');
      if (span) span.textContent = '...';
    }
    return;
  }


 
  let exchangeRate = 0;
  let paymentText = '';

  if (from === "TRX") {
    exchangeRate = rate_TRX_USDT;
    if (exchangeValue) exchangeValue.textContent = `1 TRX ≈ ${exchangeRate.toFixed(6)} USDT`;
    paymentText = `<span class="text-green-400">${fromValue.toFixed(6)}</span> TRX`;
  } else {
    exchangeRate = rate_USDT_TRX;
    if (exchangeValue) exchangeValue.textContent = `1 USDT ≈ ${exchangeRate.toFixed(6)} TRX`;
    paymentText = `<span class="text-green-400">${fromValue.toFixed(6)}</span> USDT`;
  }


  const paymentSpan = paymentDiv?.querySelector('span:last-child');
  if (paymentSpan) {
    paymentSpan.innerHTML = paymentText;
  }
}
function swapTokens() {
  const tempText = fromText.textContent;
  fromText.textContent = toText.textContent;
  toText.textContent = tempText;

  const tempIcon = fromIcon.src;
  fromIcon.src = toIcon.src;
  toIcon.src = tempIcon;

  const tempAmount = fromAmount.value;
  fromAmount.value = toAmount.value;
  toAmount.value = tempAmount;

  updateExchangeRate();
  recalculate();
}



window.addEventListener('DOMContentLoaded', () => {
    setupPurchaseButtons();
    selectToken(fromSelector, fromTokenList, true);
    selectToken(toSelector, toTokenList, false);
    fetchExchangeData();
    setInterval(fetchExchangeData, 15000); 

  fromAmount.addEventListener('input', () => {
    recalculate();
    updateExchangeRate();
  });
});
