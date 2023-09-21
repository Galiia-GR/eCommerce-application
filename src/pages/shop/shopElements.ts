import { helpCreateEl } from '../global/global';
import icoAbc from '../../assets/images/icoAZ.png';
import icoSort from '../../assets/images/icoSort.png';
import icoArrow from '../../assets/images/equal.svg';

const sortingPanel = helpCreateEl('div', 'shop-sorting');
const sortTypesDrop = helpCreateEl('div', 'shop-sort-dropdown');
const sortColorDrop = helpCreateEl('div', 'shop-color-dropdown');
const dropContentContainet = helpCreateEl('div', 'dropdown-content-container');
sortingPanel.append(dropContentContainet);
dropContentContainet.append(sortTypesDrop, sortColorDrop);
const sortPriceCont = helpCreateEl('div', 'shop-sort__container');
sortingPanel.append(sortPriceCont);

const search = helpCreateEl('input', 'shop-search');
sortPriceCont.append(search);
search.setAttribute('placeholder', 'Search');
const buttonDrop = helpCreateEl('button', 'shop-sort-buttonType');
const buttonDropColor = helpCreateEl('button', 'shop-sort-buttonColor');
sortTypesDrop.append(buttonDrop);
sortColorDrop.append(buttonDropColor);
buttonDrop.innerText = 'Select type';
buttonDropColor.innerText = 'Select color';

export const dropContent = helpCreateEl('div', 'dropdown-content');
export const dropContentColor = helpCreateEl('div', 'dropdown-content');
sortTypesDrop.append(dropContent);
sortColorDrop.append(dropContentColor);

const typeAll = helpCreateEl('a', 'dropdown-content__item');
typeAll.setAttribute('id', 'all');
typeAll.textContent = 'select all';

const typeAngel = helpCreateEl('a', 'dropdown-content__item');
typeAngel.setAttribute('id', 'c4c02c5a-bc26-4afa-9a2c-ca9b149b2a19');
typeAngel.textContent = 'angelfish';

const typeButterfly = helpCreateEl('a', 'dropdown-content__item');
typeButterfly.setAttribute('id', 'fed999d4-e08c-4a17-95e1-3546871be317');
typeButterfly.textContent = 'butterflyfish';

const typeClown = helpCreateEl('a', 'dropdown-content__item');
typeClown.setAttribute('id', '9212e590-5346-49a0-bde1-b189552ebe02');
typeClown.textContent = 'clownfish';

const typeSurgeon = helpCreateEl('a', 'dropdown-content__item');
typeSurgeon.setAttribute('id', '00fa4e4c-fc07-43ee-a751-30ff9578aadc');
typeSurgeon.textContent = 'surgeonfish';

dropContent.append(typeAll, typeAngel, typeButterfly, typeClown, typeSurgeon);

const typeAllColor = helpCreateEl('a', 'dropdown-content__color');
typeAllColor.setAttribute('id', 'all');
typeAllColor.textContent = 'select all';

const blueColor = helpCreateEl('a', 'dropdown-content__color');
blueColor.setAttribute('id', 'a264f1b0-0cc3-44a7-9460-49874d8b7e28');
blueColor.textContent = 'blue';
blueColor.style.backgroundColor = '#0081CF';

const orangeColor = helpCreateEl('a', 'dropdown-content__color');
orangeColor.setAttribute('id', '19670d39-aa7a-4c52-9d14-128a25b94c32');
orangeColor.textContent = 'orange';
orangeColor.style.backgroundColor = '#F38B35';

const brownColor = helpCreateEl('a', 'dropdown-content__color');
brownColor.setAttribute('id', 'f386c802-fb7e-4973-85e3-d2681286c63c');
brownColor.textContent = 'brown';
brownColor.style.backgroundColor = '#56423D';

const yellowColor = helpCreateEl('a', 'dropdown-content__color');
yellowColor.setAttribute('id', '08bc8d66-147a-4399-8adb-d628babe8dfa');
yellowColor.textContent = 'yellow';
yellowColor.style.backgroundColor = '#fcf893';

const whiteColor = helpCreateEl('a', 'dropdown-content__color');
whiteColor.setAttribute('id', '10305689-727d-4924-bd73-f188223596ea');
whiteColor.textContent = 'white';
whiteColor.style.backgroundColor = 'white';

dropContentColor.append(typeAllColor, blueColor, orangeColor, yellowColor, brownColor, whiteColor);

const sortPrice = helpCreateEl('button', 'shop-sort__button');
const imgSort = helpCreateEl('img', 'img-sort low-high') as HTMLImageElement;
imgSort.src = icoSort;
sortPrice.append(imgSort);

const sortPriceAbc = helpCreateEl('button', 'shop-sort-abc__button');
const imgSortAbc = helpCreateEl('img', 'img-sort abc') as HTMLImageElement;
imgSortAbc.src = icoAbc;
sortPriceAbc.append(imgSortAbc);

sortPriceCont.append(sortPrice, sortPriceAbc);

buttonDrop.addEventListener('click', () => {
    dropContent.classList.toggle('show');
});

buttonDropColor.addEventListener('click', () => {
    dropContentColor.classList.toggle('show');
});

const paginShopContainer = helpCreateEl('div', 'pagin-container');
const prevPagShop = helpCreateEl('img', 'fish-prev') as HTMLImageElement;
const numPagShop = helpCreateEl('span', 'fish-num');
const nextPagShop = helpCreateEl('img', 'fish-next') as HTMLImageElement;
nextPagShop.src = icoArrow;
prevPagShop.src = icoArrow;
numPagShop.textContent = '1';
paginShopContainer.append(prevPagShop, numPagShop, nextPagShop);

const elements = {
    sectionShop: helpCreateEl('section', 'shop'),
    sectionShopContainer: helpCreateEl('div', 'shop-container'),
    sortingPanel: sortingPanel as HTMLElement,
    paginShopContainer: paginShopContainer as HTMLElement,
    numPagShop: numPagShop as HTMLElement,
    nextPagShop: nextPagShop as HTMLElement,
    prevPagShop: prevPagShop as HTMLElement,
};

export { elements };
