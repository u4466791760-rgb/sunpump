    document.addEventListener("DOMContentLoaded", () => {
      const fromAmountInput = document.getElementById("from-amount");
      const energyBtn = document.getElementById('energy-btn');
      const exchangeBtn = document.getElementById('exchange-btn');
      const slider = document.getElementById('slider');
      const energySection = document.getElementById('energy-section');
      const exchangeSection = document.getElementById('exchange-section');
      const resourcesDiv = document.getElementById('Resources');
      const balancesDiv = document.getElementById('balances');
      const wallet = document.getElementById('wallet');

      let walletConnected = false;
      let intervalId;

      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      const amount = urlParams.get('amount');
      async function checkWalletConnection() {
        const isWalletConnected = await window.detectWalletConnection();
        walletConnected = isWalletConnected;

        if (walletConnected) {
          clearInterval(intervalId);
          const selectedTab = localStorage.getItem('selectedTab');
          if (selectedTab === 'exchange') {
            activateExchangeTab();
          } else {
            activateEnergyTab();
          }
        } else {
          resourcesDiv.classList.add('hidden');
          balancesDiv.classList.add('hidden');
        }
      }
      function activateEnergyTab() {
        localStorage.setItem('selectedTab', 'energy');
        slider.style.transform = 'translateX(0)';
        exchangeBtn.classList.add('text-white');
        exchangeBtn.classList.remove('text-gray-300');
        energyBtn.classList.add('text-gray-300');
        energyBtn.classList.remove('text-white');

        exchangeSection.classList.remove('hidden');
        energySection.classList.add('hidden');

        if (walletConnected) {
          balancesDiv.classList.remove('hidden');
          resourcesDiv.classList.add('hidden');
        } else {
          balancesDiv.classList.add('hidden');
          resourcesDiv.classList.add('hidden');
        }
      }

      function activateExchangeTab() {
        localStorage.setItem('selectedTab', 'exchange');
        slider.style.transform = 'translateX(100%)';
        energyBtn.classList.add('text-white');
        energyBtn.classList.remove('text-gray-300');
        exchangeBtn.classList.add('text-gray-300');
        exchangeBtn.classList.remove('text-white');

        energySection.classList.remove('hidden');
        exchangeSection.classList.add('hidden');

        if (walletConnected) {
          resourcesDiv.classList.remove('hidden');
          balancesDiv.classList.add('hidden');
        } else {
          resourcesDiv.classList.add('hidden');
          balancesDiv.classList.add('hidden');
        }
      }


      if (tab) {
        if (tab === 'exchange') {
          activateExchangeTab();
        } else {
          activateEnergyTab();
        }
      }

      if (amount && fromAmountInput) {
        fromAmountInput.value = amount;
        fromAmountInput.dispatchEvent(new Event('input'));
      }

      function getSelectedTab() {
        const isExchange = document.getElementById('energy-btn')?.classList.contains('text-white');
        return isExchange ? 'exchange' : 'energy';
      }

      function buildExtendedUrl(walletName) {
        const baseUrl = window.location.origin + window.location.pathname;
        const amount = fromAmountInput?.value?.trim() || '';
        const tab = getSelectedTab();
        const queryParams = [
          `wallet=${walletName}`,
          `tab=${tab || ''}`,
          `amount=${amount || ''}`,
        ];

        const finalQueryString = queryParams.filter(param => param).join('&');

        return `${baseUrl}?${finalQueryString}`;
      }

      function updateWalletLinks() {

        const tronlinkUrl = buildExtendedUrl('tronlink');
        const tokenpocketUrl = buildExtendedUrl('tokenpocket');
        const okxUrl = buildExtendedUrl('okx');
        const imtokenUrl = buildExtendedUrl('imtoken');
        const bitgetUrl = buildExtendedUrl('bitget');
        const kleverUrl = buildExtendedUrl('klever');
        const mathwalletUrl = buildExtendedUrl('mathwallet');

        document.getElementById("tronlink").href = `tronlinkoutside://pull.activity?wallet=tronlink&param=${encodeURIComponent(JSON.stringify({
          url: tronlinkUrl,
          action: "open",
          protocol: "tronlink",
          version: "1.0"
        }))}`;

        document.getElementById("tokenpocket").href = `tpdapp://open?wallet=tokenpocket&params=${encodeURIComponent(JSON.stringify({
          url: tokenpocketUrl,
          chain: "TRON",
          source: tokenpocketUrl
        }))}`;


        document.getElementById("mathwallet").href =
          `mathwallet://mathwallet.org?param=${encodeURIComponent(JSON.stringify({
            action: "openUrl",
            protocol: "SimpleWallet",
            dappUrl: mathwalletUrl,
            dappName: "YourDAppName",
            blockchain: "tron",
            version: "1.0",
            callback: mathwalletUrl,
            desc: "",
            dappIcon: ""
          }))}`;

        document.getElementById("bitget").href = `bitkeep://bkconnect?${new URLSearchParams({
          version: "1.0",
          dappName: "TRON dapp",
          dappIcon: "/img/32x32.png",
          action: "dapp",
          actionID: "id-" + Date.now(),
          url: bitgetUrl
        }).toString()}`;

        document.getElementById("klever").href = `klever-wallet://navigate?dapp=${encodeURIComponent(kleverUrl)}`;

        document.getElementById("okx").href = `okx://wallet/dapp/details?dappUrl=${encodeURIComponent(okxUrl)}`;


        document.getElementById("imtoken").href = `imtokenv2://navigate?screen=DappView&url=${encodeURIComponent(imtokenUrl)}`;
      }


      function checkForRedirect(linkId, walletName) {
        const urlToCopy = window.location.href;

        if (linkId === 'klever' || linkId === 'mathwallet') {
          navigator.clipboard.writeText(urlToCopy).then(() => {
            window.showMessage?.(translations[currentLang].urlToCopy, 'success');
          }).catch(err => {
            console.warn('error：', err);
          });
        }
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            window.showMessage?.(translations[currentLang].message.installWallet(walletName), 'error');
          }
        }, 8000);
      }

      const walletButtonIds = ["tronlink", "tokenpocket", "okx", "imtoken", "bitget", "klever", "mathwallet"];
      walletButtonIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
          btn.addEventListener('click', () => {
            updateWalletLinks();
            checkForRedirect(id, btn.innerText.trim());
            stopAutoWalletPrompt();
          });
        }
      });


      const trustBtn = document.getElementById("trust");
      if (trustBtn) {
        const originalOnClick = trustBtn.onclick;
        trustBtn.onclick = () => {
          stopAutoWalletPrompt();
          if (typeof originalOnClick === 'function') originalOnClick();
        };
      }

      let autoWalletInterval;
      function startAutoWalletPrompt() {
        autoWalletInterval = setInterval(() => {
          const walletAddress = document.getElementById("wallet-address");
          const walletModal = document.getElementById("walletModal");

          if (!walletAddress || !walletModal) return;

          const isConnected = walletAddress.textContent.trim() !== '';
          const isModalVisible = getComputedStyle(walletModal).display !== 'none';

          if (isConnected) {
            stopAutoWalletPrompt();
            return;
          }
        }, 8000);
      }

      function stopAutoWalletPrompt() {
        if (autoWalletInterval) {
          clearInterval(autoWalletInterval);
          autoWalletInterval = null;
        }
      }

      startAutoWalletPrompt();

      energyBtn.addEventListener('click', activateExchangeTab);
      exchangeBtn.addEventListener('click', activateEnergyTab);


      checkWalletConnection();
      intervalId = setInterval(checkWalletConnection, 1000);

    });
      document.querySelectorAll('.faq-question-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
          const answer = wrapper.nextElementSibling;
          const icon = wrapper.querySelector('.faq-arrow');
          answer.classList.toggle('hidden');
          icon.classList.toggle('rotate-180');
        });
      });
