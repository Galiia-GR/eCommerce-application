import { createAboutUsPage } from './about/about';
import { createShippingPage } from './shipping/shipping';
import { createShopPage } from './shop/createShopPage';
import { createContactsPage } from './contacts/contacts';
import { createMain } from './home/home';
import { createError } from './error/error';
import { createProfilePage } from './profile';
import { productList } from './shop/getProducts';

let submitLogin = false;
const customerHeaderUserEl = document.querySelector('.logo-userName') as HTMLElement;
const elLoginUser = customerHeaderUserEl.textContent;
const arrElLoginUser = elLoginUser?.split(' ');
if (arrElLoginUser !== undefined && arrElLoginUser?.length >= 2) {
    submitLogin = true;
    console.log(submitLogin);
}

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
    } else if (navClikedEl === 'PROFILE') {
        window.location.hash = '/profile';
    } else if (navClikedEl === 'SHIPPING') {
        window.location.hash = '/shipping';
    } else if (navClikedEl === 'ABOUT') {
        window.location.hash = '/about';
    } else if (navClikedEl === 'CONTACTS') {
        window.location.hash = '/contacts';
    } else if (navClikedEl === 'LOGIN') {
        if (submitLogin) {
            window.location.hash = '/';
        } else {
            window.location.hash = '/login';
        }
        window.location.hash = '/login';
    } else if (navClikedEl === 'REGISTER') {
        if (submitLogin) {
            window.location.hash = '/';
        } else {
            window.location.hash = '/register';
        }
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

productList.forEach((el) => {
    console.log(el[0].slug.en);
});

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
        case '/profile': {
            console.log('render profile');
            return createProfilePage();
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
            const loginOpen = document.querySelector('.LOGIN') as HTMLElement;
            if (submitLogin === true) {
                window.location.hash = '/';
            } else if (loginOpen.textContent === 'LOGIN' && !submitLogin) {
                loginOpen.click();
            }
            return console.log('render login');
        }
        case '/register': {
            const RegisterOpen = document.querySelector('.REGISTER') as HTMLElement;
            if (submitLogin === true) {
                window.location.hash = '/';
            } else if (RegisterOpen.textContent === 'REGISTER' && !submitLogin) {
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
