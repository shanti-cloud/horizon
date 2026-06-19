 // 1. Инициализация Telegram Web App
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

	// Замените этот массив на ваши реальные ID (можно добавить несколько админов через запятую)
	const ALLOWED_ADMIN_IDS = [5297670635]; 

	function checkAdminAccess() {
		// Проверяем, что приложение открыто внутри Telegram
		if (window.Telegram && window.Telegram.WebApp) {
			const tg = window.Telegram.WebApp;
			
			// Достаем данные пользователя
			const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : null;
			
			if (user && user.id) {
				console.log("Ваш Telegram ID:", user.id);
				
				// Если ваш ID есть в списке разрешенных — показываем панель
				if (ALLOWED_ADMIN_IDS.includes(user.id)) {
					document.getElementById('admin-panel').style.display = 'block';
				}
			}
		}
	}

	// Запускаем проверку при загрузке страницы
	document.addEventListener("DOMContentLoaded", checkAdminAccess);

        // Функция для перехода в нужный топик группы
        function navigateToTopic(topicId) {
            const baseGroupUrl = 'https://t.me/c/2835833055'; 
            tg.openTelegramLink(`${baseGroupUrl}/${topicId}`);
        }
		// Делаем функцию видимой для HTML-кнопок внутри карты:
		window.navigateToTopic = navigateToTopic;

        // Данные маршрутов
        const locations = [
            {
                name: "Линдуловская роща",
                desc: "Экотропа среди вековых лиственниц и бурная река Рощинка.",
				icon: 'forest',
                lat: 60.2392,
                lng: 29.5394,
                topicId: 428
            },
            {
                name: "Выборгский замок",
                desc: "Единственный в России полностью сохранившийся средневековый замок.",
				icon: 'landmark',
                lat: 60.7158,
                lng: 28.7291,
                topicId: 300
            }
        ];

        //  Загрузка API Яндекс.Карт
async function initMap() {
    await ymaps3.ready;
	ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@0.0');

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls} = ymaps3;
	// Load the package with the default marker, extract the class to create the default marker object
	const {YMapDefaultMarker, YMapPopupMarker} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
	
	// Создаем саму карту (Центр - Питер, зум - 8)
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [30.3141, 59.9386], // В Яндексе координаты [долгота, широта]!
                zoom: 8
            }
        }
    );

	// Добавляем слои схемы и объектов (без них карта будет пустой)
	map.addChild(new YMapDefaultSchemeLayer());
	map.addChild(new YMapDefaultFeaturesLayer());

	// Перебираем локации и добавляем метки
	locations.forEach(loc => {

		// 1. Сразу создаем HTML-элемент балуна (УБРАЛИ класс hidden из строки)
		const balloonHtml = document.createElement('div');
		balloonHtml.className = 'custom-balloon'; // Просто чистый класс для стилей
		balloonHtml.innerHTML = `
			<div class="balloon-title">${loc.name}</div>
			<div>${loc.desc}</div>
			<button class="map-btn" onclick="navigateToTopic(${loc.topicId})">Описание</button>
		`;

		// 2. Создаем Попап. Яндекс сам скроет его, потому что show: false
		const popup = new YMapPopupMarker({
			coordinates: [loc.lng, loc.lat],
			position: 'top',
			show: false, 
			content: () => balloonHtml 
		});
		
		popup.hiddenStatus = true;

		// 3. Создаем обычный маркер (точку)
		const marker = new YMapDefaultMarker({
			coordinates: [loc.lng, loc.lat],
			title: loc.name,
			subtitle: 'Нажми, чтобы открыть',
			iconName: loc.icon,
			color: { 
				day: '#2481cc',   
				night: '#FF5B4D'  
			},
			onClick: () => {
				// Переключаем видимость попапа через метод Яндекса .update()
				if (popup.hiddenStatus) {
					popup.update({ show: true }); // Показываем облако, контент внутри отобразится сразу
					popup.hiddenStatus = false;
				} else {
					popup.update({ show: false }); // Полностью скрываем облако
					popup.hiddenStatus = true;
				}
			}
		});

		// 4. Добавляем на карту оба элемента
		map.addChild(marker);
		map.addChild(popup);
	});
}

initMap();
