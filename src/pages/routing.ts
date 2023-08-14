import { createAboutUsPage } from './about/about';
import { createShippingPage } from './shipping/shipping';
import { createShopPage } from './shop/shop';
import { createContactsPage } from './contacts/contacts';

export function addMenuClickHandlers() {
    const menuHeaderItems = document.querySelectorAll('.navigation-item');
    menuHeaderItems.forEach((item) => {
        item.addEventListener('click', (event) => handleMenuItemClick(event));
    });
}

function handleMenuItemClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    const menuItemTextCont = clickedElement.textContent;
    console.log(menuItemTextCont);
    switch (menuItemTextCont) {
        case 'SHOP':
            window.location.hash = '/shop';
            return createShopPage();

        case 'SHIPPING':
            window.location.hash = '/shipping';
            return createShippingPage();

        case 'ABOUT US':
            window.location.hash = '/about';
            return createAboutUsPage();

        case 'CONTACTS':
            window.location.hash = '/contacts';
            return createContactsPage();
        default:
            return console.log('login/registration');
    }
}

addMenuClickHandlers();
