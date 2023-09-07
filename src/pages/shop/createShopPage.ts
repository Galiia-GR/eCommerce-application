import { productList } from './getProducts';
import { updateShopPage } from './updateShopPage';
import { elements } from './shopElements';
import { getSearch } from './searchProducts';

export async function createShopPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    mainTag.append(elements.sortingPanel);
    mainTag.append(elements.sectionShop);
    elements.sectionShop.append(elements.sectionShopContainer);

    await updateShopPage(productList, elements.sectionShopContainer);

    const typeContain = document.querySelectorAll('.dropdown-content__item');
    console.log('sdfsdfkm');

    typeContain.forEach((el) => {
        el.addEventListener('click', () => {
            const categoryId = `${el.getAttribute('id')}`;
            handleCategoryClick(categoryId);
        });
    });

    async function handleCategoryClick(categoryId: string) {
        try {
            const options = {
                categoryId,
            };
            const productSort = await getSearch(options);
            console.log(productSort);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }
}
