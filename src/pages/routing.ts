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
        item.addEventListener('click', (event) => menuItemClick(event));
    });

    home?.addEventListener('click', (event) => menuItemClick(event));
}

function menuItemClick(event: Event) {
    const element = event.target as HTMLElement;
    if (element.classList.contains('logo_img')) {
        const parentLogo = element.parentNode as HTMLElement;
        const select = parentLogo.textContent;

        if (select !== null) {
            const selectLower = select.toLowerCase();
            renderPage(`/${selectLower}`);
        } else {
            console.log('Text content is null');
        }
    }
    const select = element.textContent;
    if (select !== null) {
        const selectLower = select.toLowerCase();
        renderPage(`/${selectLower}`);
    } else {
        console.log('Text content is null');
    }
}
function routeChange() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        console.log('хэш', hash);
        renderPage(hash);
    });
}

routeChange();

export function renderPage(path: string) {
    switch (path) {
        case '/': {
            window.location.hash = '/';
            const mainTag = document.querySelector('main') as HTMLElement;
            mainTag.innerHTML = '';
            console.log('render home');
            return createMain();
        }
        case '/shop': {
            window.location.hash = '/shop';
            console.log('render shop');
            return createShopPage();
        }
        case '/shipping': {
            window.location.hash = '/shipping';
            console.log('render shipping');
            return createShippingPage();
        }
        case '/about': {
            window.location.hash = '/about';
            console.log('render about');
            return createAboutUsPage();
        }
        case '/contacts': {
            window.location.hash = '/contacts';
            console.log('render contact');
            return createContactsPage();
        }
        case '/login': {
            window.location.hash = '/login';
            const loginOpen = document.querySelector('.navigation-item:nth-child(5)') as HTMLElement;
            if (loginOpen.textContent === 'LOGIN') {
                loginOpen.click();
            }
            return console.log('render login');
        }
        case '/register': {
            window.location.hash = '/register';
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
