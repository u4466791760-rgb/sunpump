document.addEventListener('DOMContentLoaded', function() {
    // Список языков стран СНГ
    const cisLanguages = ['ru', 'uk', 'be', 'kk', 'uz', 'tk', 'ky', 'tg', 'hy', 'az', 'ro'];

    // Функция для проверки языка браузера
    function checkBrowserLanguage() {
        // Получаем основной язык браузера
        const userLanguage = navigator.language || navigator.languages[0];
        const languageCode = userLanguage.split('-')[0]; // Извлекаем базовый код языка (например, 'ru' из 'ru-RU')
        
        if (cisLanguages.includes(languageCode)) {
            showNotification();
        }
    }

    // Функция для отображения уведомления
    function showNotification() {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '50%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
        notification.style.padding = '20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.textAlign = 'center';
        notification.style.fontSize = '18px';
        notification.style.maxWidth = '400px';
        notification.innerHTML = 'Подключение к сайту не работает в вашей стране.<br>Включите VPN и обновите страницу (CTRL + F5)';
        document.body.appendChild(notification);
    }

    // Запуск проверки языка
    checkBrowserLanguage();
});
