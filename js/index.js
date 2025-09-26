document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;

    // Функция для переключения меню
    function toggleMenu() {
        const isMenuOpen = menu.classList.contains('header__menu--active');

        // Переключаем классы
        burger.classList.toggle('header__burger--active');
        menu.classList.toggle('header__menu--active');

        // Обновляем aria-атрибуты для доступности
        burger.setAttribute('aria-expanded', !isMenuOpen);

        // Если меню открывается, добавляем обработчик для закрытия по клику вне меню
        if (!isMenuOpen) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }

    // Функция для закрытия меню при клике вне его области
    function closeMenuOnClickOutside(event) {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
            closeMenu();
        }
    }

    // Функция для закрытия меню при нажатии на Escape
    function closeMenuOnEscape(event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    }

    // Функция для полного закрытия меню
    function closeMenu() {
        burger.classList.remove('header__burger--active');
        menu.classList.remove('header__menu--active');
        burger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }

    // Обработчики событий
    burger.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });

    // Закрытие меню при клике на ссылку
    const menuLinks = document.querySelectorAll('.header__menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', closeMenuOnEscape);

    // Закрытие меню при изменении размера окна (если перешли на десктопную версию)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1440) {
            closeMenu();
        }
    });
});