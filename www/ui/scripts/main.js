ymaps.ready(init); // Инициализация yandex.maps

$(function() {
	communicatorResize();

    $(document).on('focus blur', 'input[type="text"]', smartInputsPlaceholder); // Плейсхолдер для инпутов
    $(document).on('click', '#close-admin-block', closeAdminBlock); 			// Скрытие блока администратора
    $('form[name="add-cars-photos"]').on('submit', addCarsPhotos); 				// Тест Ajax загрузки фото
    $(document).on('click', 'button', buttonsActionHandler); 					// Обработчик событий (непонятно пригодится или нет)
    $(document).on('click', '.add-file', addFileCall); 							// Вызов input[type="file"] через button
    $('input[name="goal"]').on('click', changeGoal); 							// Перемещение машин между списками "Видимые" и "Невидимые"
    $('.catalog-view').on('click', catalogView); 								// Изменение вида списка машин Табличный/Картинками
    $(".switcher label").on('click', switcher);									// Переключатель
    $('#del-news').on('click', deleteNews); 									// Удаление новости
    $(window).resize(communicatorResize); 										// Адаптивный ресайз для коммуникатора

    /* Открытие и скрытие карты */
    $('.show-map').click(function() {
    	$('.auto-map').slideToggle();
    });

    /* Плагин скроллбара */
    $('.block-with-scrollbar').mCustomScrollbar({
    	scrollInertia: 300,
    	hScroll: false,
    	alwaysShowScrollbar: 1
   	});

    /* Плагин для select'ов */
   	$('select').chosen({
   		width: "100%",
   		disable_search: true,
   		inherit_select_classes: true
   	});

   	$(':password').password();
});

function switcher()
{
	var labelClass = $(this).attr('class');
	var id = $(this).attr('for');

	switch (labelClass) {
		case 'brands':
			brandsSwitcher(id);
			break;
	}
}

function brandsSwitcher( id )
{
	$('.brands-list').hide();
	$('.brands-list.' + id).show();
}

function showPhotoUploadeForm(e)
{
	$('.places-photo-uploads').removeClass('hidden');
	$(this).removeClass('start').addClass('add-file').next().css('opacity', 0);
}

function addFileCall(e)
{
	e.preventDefault();
	var id = $(this).attr('data-name');

	if ($(this).hasClass('start')) {
		$('.places-photo-uploads').removeClass('hidden');
		$(this).removeClass('start').next().css('opacity', 0);
	} else if (typeof id === 'undefined') {
		$('input[type="file"]').each(function(){
			if (!$(this).val()) {
				$(this).click();
				return false;
			}
		});
	} else {
		$('input[name="' + id + '"]').click();
	}
}

function smartInputsPlaceholder()
{
	var input = $(this);
	var value = input.val();
	var defaultVal = input.attr('data-value');

	if (event.type == 'focus' || event.type == 'focusin') {
		if (value == defaultVal) {
			input.val('');
		}
	} else {
		if (!value) {
			input.val(defaultVal);
		}
	}
}

function changeGoal()
{
	$('.goal__item').removeClass('selected').addClass('disabled');
	$(this).parents('.goal__item').addClass('selected').removeClass('disabled');
}

function catalogView()
{
	var states = ['Показать таблицей', 'Показать картинками'];
	var buttonText = $(this).children('.text');
	var catalogBlock = $('.catalog-list');
	var catalogLineClass = 'catalog-line';

	if (catalogBlock.hasClass(catalogLineClass)) {
		buttonText.text(states[0]);
	} else {
		buttonText.text(states[1]);
	}

	catalogBlock.toggleClass(catalogLineClass);
}

function init(){
    var city = $('.dropdown-toggle').text();
    var street = $('.address-block').find('.address').text();
    var address = city + ', ' + street;
    var geocoder = new ymaps.geocode(address, { results: 1 });

    console.log(address);

    geocoder.then(
        function (res) {
            var coord = res.geoObjects.get(0).geometry.getCoordinates();
            var map = new ymaps.Map('map', {
                center: coord,
                zoom: 7,
                behaviors: ['default', 'scrollZoom'],
                controls: ['mapTools']
            });

            var myPlacemark = new ymaps.Placemark(coord, {}, {
            	iconImageClipRect: [[0,120], [50, 192]],
			    iconImageHref: '/ui/images/sprite.png',
			    iconImageSize: [50, 72],
			    iconImageOffset: [-25, -72]
			});

            map.geoObjects.add(myPlacemark);
            map.zoomRange.get(coord).then(function(range){
                map.setCenter(coord, range[1] - 1);
            });
        }
    );
}

function deleteNews( e )
{
	e.preventDefault();
	var data = {link: $(this).attr('href')};
	$('.news-single').append($.templates("#delNews").render(data));
	$('.admin-action').animate({opacity: 1}, 200);
}

function closeAdminBlock( e )
{
	e.preventDefault();
	$('.admin-action').animate({opacity: 0}, 200);
	setTimeout(function(){
		$('.admin-action').remove();
	}, 200);
}

function addCarsPhotos( e )
{
	e.preventDefault();
	$.ajax({
	    url: '/handlers/add-cars-photos.php',
	    type: 'POST',
	    data: $('form[name="add-cars-photos"]').serialize(),
	    success: function(html){
	        
	    }
	});
}

function buttonsActionHandler( e )
{
	e.preventDefault();

	var button = $(this);
	var adminAction = button.attr('button-action');

	if (typeof adminAction !== 'undefined') {
		switch (adminAction) {
			case 'car-redact':
				adminCarRedact(button);
				break;
			case 'car-visibility':
				adminCarVisibility(button);
				break;
			case 'car-delete':
				adminCarDelete(button);
				break;
			case 'dialogue-delete':
				dialogueDelete(button);
				break;
		}
	}
}

function adminCarVisibility( button )
{
	var parent = button.parents('ul');
	var item = button.parents('li');
	var list = parent.hasClass('catalog-list--hidden') ? '.catalog-list--visible' : '.catalog-list--hidden';

	item.clone().appendTo(list);
	item.remove();
}

function communicatorResize()
{
	var wHeight = $(window).height();
	var headHeight = $('.header').outerHeight();
	var footerHeight = $('.footer').outerHeight();

	$('.communicator').css('height', (wHeight - headHeight - footerHeight) + 'px');
}

function dialogueDelete( button )
{
	var data = {};
	var parentsClass = button.parent().parent().attr('class');

	switch (parentsClass) {
		case 'client-info':
			data = {
				person: 'Клиент',
				user: 'Дилер'
			};
			break;
		case 'dealer-info':
			data = {
				person: 'Дилер',
				user: 'Клиент'
			};
			break;
	}

	button.removeAttr('button-action');
	$('.dialogue-wrapper').append($.templates("#dialogueDelete").render(data));
	$('.b-dialogue-delete').animate({opacity: 1}, 200);

	$('#close-dialogue-delete').bind('click', function() {
		$('.b-dialogue-delete').animate({opacity: 0}, 200);
		setTimeout(function(){
			$('.l-dialogue-delete').remove();
		}, 200);
		button.attr('button-action', 'dialogue-delete');
	});

	$('#dialogue-delete').bind('click', function(e) {
		e.preventDefault();

		// ajaxHandler

		$('.b-dialogue-delete').html($.templates("#dialogueWasDeleted").render(data));
	});
}