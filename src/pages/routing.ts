import { createAboutUsPage } from './about/about';
import { createShippingPage } from './shipping/shipping';
import { createShopPage } from './shop/shop';
import { createContactsPage } from './contacts/contacts';
import { createMain } from './home/home';
import { createError } from './error/error';

export function menuNavClick() {
    const home = document.querySelector('.logo_link');
    const menuHeaderItems = document.querySelectorAll('.navigation-link');
    menuHeaderItems.forEach((item) => {
        item.addEventListener('click', (event) => menuItemClick(event));
    });

    home?.addEventListener('click', (event) => menuItemClick(event));
}

function menuItemClick(event: Event) {
    const element = event.target as HTMLElement;
    if (element.classList.contains('logo_img')) {
        const parentLogo = element.parentNode as HTMLElement;
        const select = parentLogo?.getAttribute('href');
        renderPage(`${select}`);
    }
    const select = element.getAttribute('href');
    console.log(element);
    renderPage(`${select}`);
}

function routeChange() {
    window.addEventListener('hashchange', () => {
        const { hash } = window.location;
        renderPage(hash);
    });
}

routeChange();

export function renderPage(path: string) {
    switch (path) {
        case '#home': {
            const mainTag = document.querySelector('main') as HTMLElement;
            mainTag.innerHTML = '';
            console.log('render home');
            return createMain();
        }
        case '#shop': {
            console.log('render shop');
            return createShopPage();
        }
        case '#shipping': {
            console.log('render shipping');
            return createShippingPage();
        }
        case '#about': {
            console.log('render about');
            return createAboutUsPage();
        }
        case '#contacts': {
            console.log('render contacts');
            return createContactsPage();
        }
        default:
            return createError();
    }
}
