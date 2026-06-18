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

        // 2. Данные ваших маршрутов
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

        // 3. Загрузка API Яндекс.Карт
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
				

				// 1. Создаем объект Попапа (но передаем свойство "hidden: true", чтобы он изначально был скрыт)
				const popup = new YMapPopupMarker({
					coordinates: [loc.lng, loc.lat],
					position: 'top',
					hidden: true, // Скрыт по умолчанию
					// Переименовали в content и возвращаем DOM-элемент через функцию
					content: () => {
						const balloonHtml = document.createElement('div');
						balloonHtml.className = 'custom-balloon';
						balloonHtml.innerHTML = `
							<div class="balloon-title">${loc.name}</div>
							<div>${loc.desc}</div>
							<button class="map-btn" onclick="navigateToTopic(${loc.topicId})">Описание</button>
						`;
						return balloonHtml;
					}
				});

				// 2. Создаем обычный маркер (точку)
				const marker = new YMapDefaultMarker({
					coordinates: [loc.lng, loc.lat],
					title: loc.name,
					subtitle: 'Нажми, чтобы открыть',
					iconName: loc.icon,
					color: { 
						day: '#2481cc',   
						night: '#FF5B4D'  
					},
					// Вешаем событие клика прямо в настройки маркера
					onClick: () => {
						// Переключаем видимость попапа (если скрыт — показываем, и наоборот)
						popup.update({ hidden: !popup.hidden });
					}
				});

				// 5. Добавляем на карту ОБА элемента (и точку, и скрытый попап к ней)
				map.addChild(marker);
				map.addChild(popup);
			});	
}

initMap();
