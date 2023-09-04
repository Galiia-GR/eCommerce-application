import { helpCreateEl } from '../global/global';

const sortingPanel = helpCreateEl('div', 'shop-sorting');
sortingPanel.innerHTML = '<button class="shop-fish__button">test sort</button>';

const elements = {
    sectionShop: helpCreateEl('section', 'shop'),
    sectionShopContainer: helpCreateEl('div', 'shop-container'),
    sortingPanel: sortingPanel as HTMLElement,
};

export { elements };
