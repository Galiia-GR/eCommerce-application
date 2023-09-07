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
typeAngel.setAttribute('id', 'c4c02c5a-bc26-4afa-9a2c-ca9b149b2a19');
typeAngel.setAttribute('href', '#/shop');
typeAngel.textContent = 'angelfish';

const typeButterfly = helpCreateEl('a', 'dropdown-content__item');
typeButterfly.setAttribute('id', 'fed999d4-e08c-4a17-95e1-3546871be317');
typeButterfly.setAttribute('href', '#/shop');
typeButterfly.textContent = 'butterflyfish';

const typeClown = helpCreateEl('a', 'dropdown-content__item');
typeClown.setAttribute('id', '9212e590-5346-49a0-bde1-b189552ebe02');
typeClown.setAttribute('href', '#/shop');
typeClown.textContent = 'clownfish';

const typeSurgeon = helpCreateEl('a', 'dropdown-content__item');
typeSurgeon.setAttribute('id', '00fa4e4c-fc07-43ee-a751-30ff9578aadc');
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
