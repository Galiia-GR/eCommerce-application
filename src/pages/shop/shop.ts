import { helpCreateEl } from '../global/global';

export function createShopPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionShop = helpCreateEl('section', 'shop');
    const sectionShopContainer = helpCreateEl('div', 'shop-container');
    mainTag.append(sectionShop);
    sectionShop.append(sectionShopContainer);
    sectionShopContainer.innerText = 'Not completed yet SHOP';
}
