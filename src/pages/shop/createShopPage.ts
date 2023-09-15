import { productList } from './getProducts';
import { updateShopPage, updateShopPageWithParams, smartUpdate } from './updateShopPage';
import { elements, dropContent, dropContentColor } from './shopElements';
import { paramsState } from './paramsState';
import { helpCreateEl } from '../global/global';
import icoArrow from '../../assets/images/equal.svg';

export async function createShopPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    mainTag.append(elements.sortingPanel);
    mainTag.append(elements.sectionShop);
    elements.sectionShop.append(elements.sectionShopContainer);

    await updateShopPage(productList, elements.sectionShopContainer);
    const titleSelectType = document.querySelector('.shop-sort-buttonType') as HTMLElement;
    const titleSelectColor = document.querySelector('.shop-sort-buttonColor') as HTMLElement;

    const typeContain = document.querySelectorAll('.dropdown-content__item');
    const typeColorContain = document.querySelectorAll('.dropdown-content__color');

    typeContain.forEach((el) => {
        el.addEventListener('click', () => {
            const categoryId = `${el.getAttribute('id')}`;
            handleCategoryClick(categoryId);
            dropContent.classList.remove('show');
            titleSelectType.textContent = el.textContent;
        });
    });

    typeColorContain.forEach((el) => {
        el.addEventListener('click', () => {
            const color = `${el.getAttribute('id')}`;
            dropContentColor.classList.remove('show');
            const htmlElement = el as HTMLElement;
            titleSelectColor.textContent = el.textContent;
            titleSelectColor.style.color = htmlElement.style.backgroundColor;
            handleColorClick(color);
        });
    });

    async function handleCategoryClick(categoryId: string) {
        try {
            if (categoryId === 'all') {
                paramsState.filter.category = '';
                titleSelectType.textContent = 'Select type';
                await smartUpdate();
            } else {
                paramsState.filter.category = categoryId;
                await updateShopPageWithParams();
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    async function handleColorClick(color: string) {
        try {
            if (color === 'all') {
                paramsState.filter.color = '';
                titleSelectColor.textContent = 'Select color';
                titleSelectColor.style.color = 'white';
                await smartUpdate();
            } else {
                paramsState.filter.color = color;
                await updateShopPageWithParams();
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    const sortPriceButton = document.querySelector('.img-sort');
    const sortAbcButton = document.querySelector('.abc');

    sortPriceButton?.addEventListener('click', async () => {
        switch (paramsState.sort.price) {
            case 'asc':
                sortPriceButton.classList.remove('high-low');
                sortPriceButton.classList.add('low-high');
                break;
            case 'desc':
                sortPriceButton.classList.remove('low-high');
                sortPriceButton.classList.add('high-low');

                break;
            default: {
                sortPriceButton.classList.remove('low-high');
                sortPriceButton.classList.add('high-low');
            }
        }
        paramsState.sort.setPrice();
        await smartUpdate();
    });

    sortAbcButton?.addEventListener('click', async () => {
        switch (paramsState.sort.name) {
            case 'asc':
                sortAbcButton.classList.remove('cba');
                sortAbcButton.classList.add('abc');
                break;
            case 'desc':
                sortAbcButton.classList.remove('abc');
                sortAbcButton.classList.add('cba');

                break;
            default: {
                sortAbcButton.classList.remove('abc');
                sortAbcButton.classList.add('cba');
            }
        }
        paramsState.sort.setName();
        await smartUpdate();
    });

    const inputContainer = document.querySelector('.shop-search') as HTMLInputElement;

    inputContainer?.addEventListener('input', () => {
        const searchTextInput = inputContainer.value.toLocaleLowerCase();

        if (searchTextInput) {
            updateShopPage(
                [...productList].filter((data) => data[0].name.en.toLocaleLowerCase().includes(searchTextInput)),
                elements.sectionShopContainer
            );
        } else {
            updateShopPage(productList, elements.sectionShopContainer);
        }
    });

    drawPagin();
}

function drawPagin() {
    const sectionShop = document.querySelector('.shop');
    const paginShopContainer = helpCreateEl('div', 'pagin-container');
    const prevPagShop = helpCreateEl('img', 'fish-prev') as HTMLImageElement;
    const numPagShop = helpCreateEl('span', 'fish-num');
    const nextPagShop = helpCreateEl('img', 'fish-next') as HTMLImageElement;
    nextPagShop.src = icoArrow;
    prevPagShop.src = icoArrow;
    numPagShop.textContent = '1';
    paginShopContainer.append(prevPagShop, numPagShop, nextPagShop);

    sectionShop?.append(paginShopContainer);
}
