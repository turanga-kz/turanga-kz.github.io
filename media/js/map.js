var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {

            var center = [53.215693, 63.630160];

            var myMap = new ymaps.Map('map_cont', {
                center: center,
                zoom: 18,
                type: 'yandex#map',
                controls: ['fullscreenControl']
            });
            myMap.behaviors.disable('scrollZoom');

var ctrlKey = false;
var ctrlMessVisible = false;
var timer;


 // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
//            iconImageOffset: [2, 2]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([49.794999463693934,73.08906505886074], {
            hintContent: 'ул. Ермекова, строение 29',
            balloonContent: 'ТОО «КЕН ГРУП»',
            iconContent: ''
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: '/media/img/kenmap22.png',
            // Размеры метки.
            iconImageSize: [63, 54],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-20, -30],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [-20, -20],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);



// Отслеживаем скролл мыши на карте, чтобы показывать уведомление
myMap.events.add(['wheel', 'mousedown'], function(e) {
    if (e.get('type') == 'wheel') {
        if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
            $('#ymap_ctrl_display').fadeIn(300);
            ctrlMessVisible = true;
            clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
            timer = setTimeout(function() {
                $('#ymap_ctrl_display').fadeOut(300);
                ctrlMessVisible = false;
            }, 1500);
        }
        else { // Ctrl нажат, скрываем сообщение
            $('#ymap_ctrl_display').fadeOut(100);
        }
    }
    if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
        $('#ymap_ctrl_display').fadeOut(100);
    }
});

// Обрабатываем нажатие на Ctrl
$(document).keydown(function(e) {
    if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
        ctrlKey = true;
        myMap.behaviors.enable('scrollZoom');
    }
});
$(document).keyup(function(e) { // Ctrl не нажат: выключаем масштабирование мышью
    if (e.which === 17) {
        ctrlKey = false;
        myMap.behaviors.disable('scrollZoom');
    }
});
}

