<?
	header('Content-type: text/html; charset=utf-8');
	$dir = explode('/', $_SERVER['REQUEST_URI']);

	if ($dir[1] == 'UIkit') {
		require_once('UIkit.html');
		exit();
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>HitRUS</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link href="ui/styles/fotorama.css" rel="stylesheet" type="text/css">
	<link href="ui/styles/social-likes_flat.css" rel="stylesheet" type="text/css">
	<link href="ui/styles/main.css" rel="stylesheet" type="text/css">
</head>
<body class="body">
	<div class="container">
		<header class="header">
			<a href="#" class="logo left"><span class="text-bold">Hit</span>RUS</a>
			<span class="site-desc left">
				<span>
					Официальные диллеры,<br>
					гарантия на машины
				</span>
			</span>
			<div class="cities-button dropdown">
				<button type="button" class="dropdown-toggle header-button" data-toggle="dropdown" aria-expanded="true">
					<span class="fa fa-lg fa-map-marker"></span> Сантк Петербург
				</button>
				<div class="dropdown-menu">
					<ul class="list-unstyled" role="menu" aria-labelledby="dropdownMenu1">
						<li>Санкт-Петербург</li>
						<li><a href="#" class="link">Москва</a></li>
						<li><a href="#" class="link">Самара</a></li>
					</ul>
				</div>
			</div>
			<div class="header-button name"><span class="fa fa-user"></span> Rolf</div>
			<a href="#" class="button button--blue">Купить, продать, обменять машину</a>
		</header>
		<div class="menu">
			<ul class="list-unstyled">
				<li><a href="/about">О компании</a></li>
				<li><a href="/main-page">Главная страница</a></li>
				<li><a href="/add-car__1step">Добавление машины (Шаг 1)</a></li>
				<li><a href="/add-car__2step">Добавление машины (Шаг 2)</a></li>
				<li><a href="/add-car__3step">Добавление машины (Шаг 3)</a></li>
				<li><a href="/add-car__4step">Добавление машины (Шаг 4)</a></li>
				<li><a href="/add-car__5step">Добавление машины (Шаг 5)</a></li>
				<li><a href="/add-car__complete">Добавление машины (Завершено)</a></li>
				<li><a href="/add-car__dealer">Добавление машины (Дилером)</a></li>
				<li><a href="/add-car__password-recovery">Добавление машины (Восстановление пароля)</a></li>
				<li><a href="/add-car__preview">Добавление машины (Предпросмотр)</a></li>
				<li><a href="/add-dealer">Добавление дилера</a></li>
				<li><a href="/add-news">Добавление новости</a></li>
				<li><a href="/auto">Непонятная ссылка</a></li>
				<li><a href="/auto__client">Непонятная ссылка</a></li>
				<li><a href="/catalog">Каталог</a></li>
				<li><a href="/communicator">Коммуникатор</a></li>
				<li><a href="/communicator__admin">Коммуникатор (Админ)</a></li>
				<li><a href="/communicator__client">Коммуникатор (Клиент)</a></li>
				<li><a href="/communicator__dealer">Коммуникатор (Дилер)</a></li>
				<li><a href="/communicator__dealer--new-car">Коммуникатор</a></li>
				<li><a href="/dealer-redact">Редактирование дилера</a></li>
				<li><a href="/news">Страница новостей</a></li>
				<li><a href="/news__single">Новость</a></li>
				<li><a href="/obsercation-post">Непонятная ссылка</a></li>
				<li><a href="/partners">Партнеры</a></li>
				<li><a href="/password">Пароль</a></li>
				<li><a href="/password_email-enter">Пароль (Ввод почты)</a></li>
				<li><a href="/password_new-pass">Пароль (Новый пароль)</a></li>
				<li><a href="/settings">Настройки</a></li>
				<li><a href="/settings__dealer">Настройки (Дилер)</a></li>
				<li><a href="/settings__user">Настройки (Пользователь)</a></li>
				<li><a href="/admin-panel">Админка</a></li>
				<li><a href="/rating-dealer">Рейтинг дилеров</a></li>
			</ul>
		</div>
		<? include "{$dir[1]}.html" ?>
		<footer class="footer">
			<span class="copyright">&copy; 2014 hitrus</span>
			<ul>
				<li><a href="#">О компании</a></li>
				<li><a href="#">Партнеры</a></li>
				<li><a href="#">Рейтинг дилеров</a></li>
				<li><a href="#">Дилерам</a></li>
			</ul>
			<span class="made-by"><a href="http://aidem.ru/" target="_blank">Сайт сделан в <img src="ui/images/logo-aidem.png" alt="Aidem — проектирование и дизайн интерфейсов"></a></span>
		</footer>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="ui/scripts/jquery.mCustomScrollbar.js"></script>
	<script type="text/javascript" src="ui/scripts/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="ui/scripts/social-likes.min.js"></script>
	<script type="text/javascript" src="ui/scripts/bootstrap-show-password.js"></script>
	<script type="text/javascript" src="ui/scripts/fotorama.js"></script>
	<script type="text/javascript" src="ui/scripts/jsviews.js"></script>
	<script type="text/javascript" src="ui/scripts/slider.js"></script>
	<script type="text/javascript" src="ui/scripts/brands.js"></script>
	<script src="http://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU" type="text/javascript"></script>
	<script type="text/javascript" src="ui/scripts/main.js"></script>
	<div style="display: none;">
		<? include 'tpls/jsviews.html'; ?>
	</div>
</body>
</html>