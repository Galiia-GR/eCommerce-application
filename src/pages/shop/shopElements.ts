import { helpCreateEl } from '../global/global';
import icoAbc from '../../assets/images/icoAZ.png';
import icoSort from '../../assets/images/icoSort.png';

const sortingPanel = helpCreateEl('div', 'shop-sorting');
const sortTypesDrop = helpCreateEl('div', 'shop-sort-dropdown');
sortingPanel.append(sortTypesDrop);
const sortPriceCont = helpCreateEl('div', 'shop-sort__container');
sortingPanel.append(sortPriceCont);

const search = helpCreateEl('input', 'shop-search');
sortPriceCont.append(search);
search.setAttribute('placeholder', 'Search');
const buttonDrop = helpCreateEl('button', 'shop-sort-button');
sortTypesDrop.append(buttonDrop);
buttonDrop.innerText = 'Select type';

const dropContent = helpCreateEl('div', 'dropdown-content');
sortTypesDrop.append(dropContent);

const typeAngel = helpCreateEl('a', 'dropdown-content__item');
typeAngel.setAttribute('id', 'c44c0ab5-8c28-47f3-99f3-36a5bab8da78');
typeAngel.setAttribute('href', '#/shop');
typeAngel.textContent = 'angelfish';

const typeButterfly = helpCreateEl('a', 'dropdown-content__item');
typeButterfly.setAttribute('id', '386958c8-1b60-4f1e-b76c-446e683a0cfd');
typeButterfly.setAttribute('href', '#/shop');
typeButterfly.textContent = 'butterflyfish';

const typeClown = helpCreateEl('a', 'dropdown-content__item');
typeClown.setAttribute('id', '4ba6908f-25c6-408e-80d5-118b7cb5c606');
typeClown.setAttribute('href', '#/shop');
typeClown.textContent = 'clownfish';

const typeSurgeon = helpCreateEl('a', 'dropdown-content__item');
typeSurgeon.setAttribute('id', 'be96ce98-dbec-43b9-b78d-595d193af4d7');
typeSurgeon.setAttribute('href', '#/shop');
typeSurgeon.textContent = 'surgeonfish';

dropContent.append(typeAngel, typeButterfly, typeClown, typeSurgeon);

const sortPrice = helpCreateEl('button', 'shop-sort__button');
const imgSort = helpCreateEl('img', 'img-sort') as HTMLImageElement;
imgSort.src = icoSort;
sortPrice.append(imgSort);

const sortPriceAbc = helpCreateEl('button', 'shop-sort-abc__button');
const imgSortAbc = helpCreateEl('img', 'img-sort') as HTMLImageElement;
imgSortAbc.src = icoAbc;
sortPriceAbc.append(imgSortAbc);

sortPriceCont.append(sortPrice, sortPriceAbc);

buttonDrop.addEventListener('click', () => {
    dropContent.classList.toggle('show');
});

const elements = {
    sectionShop: helpCreateEl('section', 'shop'),
    sectionShopContainer: helpCreateEl('div', 'shop-container'),
    sortingPanel: sortingPanel as HTMLElement,
};

export { elements };
