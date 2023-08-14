import { helpCreateEl } from '../global/global';

export function createShippingPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionShip = helpCreateEl('section', 'shipping');
    const sectionShipContainer = helpCreateEl('div', 'shipping-container');
    mainTag.append(sectionShip);
    sectionShip.append(sectionShipContainer);
    sectionShipContainer.innerText = 'Not completed yet SHIPPING';
}
