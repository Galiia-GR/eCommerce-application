import { productList, getProductList } from './getProducts';
import { updateShopPage } from './updateShopPage';
import { elements, dropContent, dropContentColor } from './shopElements';
import { getSearch } from './searchProducts';

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
            titleSelectColor.textContent = 'Select color';
            titleSelectColor.style.color = 'white';
        });
    });

    typeColorContain.forEach((el) => {
        el.addEventListener('click', () => {
            const color = `${el.getAttribute('id')}`;
            dropContentColor.classList.remove('show');
            titleSelectType.textContent = 'Select type';
            const htmlElement = el as HTMLElement;
            titleSelectColor.textContent = el.textContent;
            titleSelectColor.style.color = htmlElement.style.backgroundColor;
            handleColorClick(color);
        });
    });

    async function handleCategoryClick(categoryId: string) {
        try {
            if (categoryId === 'all') {
                await updateShopPage(productList, elements.sectionShopContainer);
                titleSelectType.textContent = 'Select type';
                titleSelectColor.textContent = 'Select color';
                titleSelectColor.style.color = 'white';
            } else {
                const options = {
                    categoryId,
                };
                const productSort = await getSearch(options);
                const productSortList = await getProductList(productSort);
                await updateShopPage(productSortList, elements.sectionShopContainer);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    async function handleColorClick(color: string) {
        try {
            if (color === 'all') {
                await updateShopPage(productList, elements.sectionShopContainer);
                titleSelectType.textContent = 'Select type';
                titleSelectColor.textContent = 'Select color';
                titleSelectColor.style.color = 'white';
            } else {
                const options = {
                    color,
                };
                const productSort = await getSearch(options);
                const productSortList = await getProductList(productSort);
                await updateShopPage(productSortList, elements.sectionShopContainer);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    const sortPriceButton = document.querySelector('.img-sort');
    const sortAbcButton = document.querySelector('.abc');

    sortPriceButton?.addEventListener('click', () => {
        if (sortPriceButton.classList.contains('high-low')) {
            sortPriceButton.classList.remove('high-low');
            sortPriceButton.classList.add('low-high');

            const options: { data: string; value: string } = {
                data: 'price',
                value: 'desc',
            };
            handleCategoryPriceAbc(options);
        } else {
            sortPriceButton.classList.remove('low-high');
            sortPriceButton.classList.add('high-low');

            const options: { data: string; value: string } = {
                data: 'price',
                value: 'asc',
            };
            handleCategoryPriceAbc(options);
        }
    });

    sortAbcButton?.addEventListener('click', () => {
        if (sortAbcButton.classList.contains('cba')) {
            sortAbcButton.classList.remove('cba');
            sortAbcButton.classList.add('abc');
            const options: { data: string; value: string } = {
                data: 'name.en',
                value: 'desc',
            };
            handleCategoryPriceAbc(options);
        } else {
            sortAbcButton.classList.remove('abc');
            sortAbcButton.classList.add('cba');
            const options: { data: string; value: string } = {
                data: 'name.en',
                value: 'asc',
            };
            handleCategoryPriceAbc(options);
        }
    });

    async function handleCategoryPriceAbc(options: { data: string; value: string }) {
        try {
            const productSort = await getSearch(options);
            const productSortList = await getProductList(productSort);
            await updateShopPage(productSortList, elements.sectionShopContainer);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

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
}
