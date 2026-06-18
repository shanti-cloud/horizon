 // 1. Инициализация Telegram Web App
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

        // Функция для перехода в нужный топик группы
        function navigateToTopic(topicId) {
            // ЗАМЕНИТЕ НА ЮЗЕРНЕЙМ ВАШЕЙ ГРУППЫ
            const baseGroupUrl = 'https://t.me/c/2835833055'; 
            tg.openTelegramLink(`${baseGroupUrl}/${topicId}`);
        }

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

		// 1. Сразу создаем DOM-элемент балуна
		const balloonHtml = document.createElement('div');
		balloonHtml.className = 'custom-balloon';
		balloonHtml.innerHTML = `
			<div class="balloon-title">${loc.name}</div>
			<div>${loc.desc}</div>
			<button class="map-btn" onclick="navigateToTopic(${loc.topicId})">Описание</button>
		`;

		// 2. Создаем объект Попапа (передаем вовзращенный элемент в 'element')
		const popup = new YMapPopupMarker({
			coordinates: [loc.lng, loc.lat],
			position: 'top',
			element: balloonHtml // Используем строго element вместо content
		});

		// Хак для v3.0: скрываем попап через обычные CSS стили при инициализации, 
		// так как Яндекс иногда игнорирует внутренний флаг hidden до первого update
		balloonHtml.style.display = 'none';
		popup.hidden = true; // дублируем в объект для логики клика

		// 3. Создаем обычный маркер (точку)
		const marker = new YMapDefaultMarker({
			coordinates: [loc.lng, loc.lat],
			title: loc.name,
			subtitle: 'Нажми, чтобы открыть',
			color: { 
				day: '#2481cc',   
				night: '#FF5B4D'  
			},
			onClick: () => {
				// Переключаем видимость
				if (popup.hidden) {
					balloonHtml.style.display = 'block';
					popup.update({ hidden: false });
					popup.hidden = false;
				} else {
					balloonHtml.style.display = 'none';
					popup.update({ hidden: true });
					popup.hidden = true;
				}
			}
		});

    // 4. Добавляем на карту ОБА элемента
    map.addChild(marker);
    map.addChild(popup);
});	
}

initMap();
