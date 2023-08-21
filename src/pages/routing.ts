import { createAboutUsPage } from './about/about';
import { createShippingPage } from './shipping/shipping';
import { createShopPage } from './shop/shop';
import { createContactsPage } from './contacts/contacts';
import { createMain } from './home/home';
import { createError } from './error/error';

export function menuNavClick() {
    const home = document.querySelector('.logo_link');
    const menuHeaderItems = document.querySelectorAll('.navigation-item');
    menuHeaderItems.forEach((item) => {
        item.addEventListener('click', (event) => menuItemClickHandle(event));
    });

    home?.addEventListener('click', (event) => menuItemClickHandle(event));
}

function menuItemClickHandle(event: Event) {
    const element = event.target as HTMLElement;
    const navClikedEl = element.textContent;

    if (element.classList.contains('logo_img')) {
        window.location.hash = '/';
    } else if (navClikedEl === 'SHOP') {
        window.location.hash = '/shop';
    } else if (navClikedEl === 'SHIPPING') {
        window.location.hash = '/shipping';
    } else if (navClikedEl === 'ABOUT') {
        window.location.hash = '/about';
    } else if (navClikedEl === 'CONTACTS') {
        window.location.hash = '/contacts';
    } else if (navClikedEl === 'LOGIN') {
        window.location.hash = '/login';
    } else if (navClikedEl === 'REGISTER') {
        window.location.hash = '/register';
    } else {
        console.log('Text content is null');
    }
}

function routeChange() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        renderPage(hash);
    });
}

export function renderPage(path: string) {
    switch (path) {
        case '/': {
            const mainTag = document.querySelector('main') as HTMLElement;
            mainTag.innerHTML = '';
            console.log('render home');
            return createMain();
        }
        case '/shop': {
            console.log('render shop');
            return createShopPage();
        }
        case '/shipping': {
            console.log('render shipping');
            return createShippingPage();
        }
        case '/about': {
            console.log('render about');
            return createAboutUsPage();
        }
        case '/contacts': {
            console.log('render contact');
            return createContactsPage();
        }
        case '/login': {
            const loginOpen = document.querySelector('.navigation-item:nth-child(5)') as HTMLElement;
            if (loginOpen.textContent === 'LOGIN') {
                loginOpen.click();
            }
            return console.log('render login');
        }
        case '/register': {
            const RegisterOpen = document.querySelector('.navigation-item:nth-child(6)') as HTMLElement;
            if (RegisterOpen.textContent === 'REGISTER') {
                RegisterOpen.click();
            }
            return console.log('render register');
        }
        default:
            return createError();
    }
}

menuNavClick();
routeChange();
