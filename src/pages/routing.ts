import { createAboutUsPage } from './about/about';
import { createShopPage } from './shop/createShopPage';
import { createMain } from './home/home';
import { createError } from './error/error';
import { createProfilePage } from './profile';
import { allProductList } from './shop/getProducts';
import { ProductAndElement } from './shop/types';
import { createBasketPage } from './basket';

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
    } else if (element.classList.contains('BASKET')) {
        window.location.hash = '/basket';
    } else if (navClikedEl === 'ABOUT') {
        window.location.hash = '/about';
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

export function renderPage(path: string) {
    switch (path) {
        case '/': {
            const mainTag = document.querySelector('main') as HTMLElement;
            mainTag.innerHTML = '';
            return createMain();
        }
        case '/shop': {
            return createShopPage();
        }
        case '/profile': {
            return createProfilePage();
        }
        case '/basket': {
            return createBasketPage();
        }
        case '/about': {
            return createAboutUsPage();
        }
        case '/login': {
            const loginOpen = document.querySelector('.LOGIN') as HTMLElement;
            if (submitLogin === true) {
                window.location.hash = '/';
            } else if (loginOpen.textContent === 'LOGIN' && !submitLogin) {
                loginOpen.click();
            }
            return undefined;
        }
        case '/register': {
            const RegisterOpen = document.querySelector('.REGISTER') as HTMLElement;
            if (submitLogin === true) {
                window.location.hash = '/';
            } else if (RegisterOpen.textContent === 'REGISTER' && !submitLogin) {
                RegisterOpen.click();
            }
            return undefined;
        }
        default: {
            const res: ProductAndElement | undefined = allProductList.find(
                (e) => `#/shop/${e[0].slug.en}` === window.location.hash
            );
            if (res) {
                res[1].click();
            } else {
                return createError();
            }
            return undefined;
        }
    }
}

menuNavClick();
routeChange();
