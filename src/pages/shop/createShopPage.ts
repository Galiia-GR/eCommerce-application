import { productList } from './getProducts';
import { updateShopPage } from './updateShopPage';
import { elements } from './shopElements';
import { sorting } from './sorting';
import { ProductAndElement } from './types';

elements.sortingPanel.addEventListener('click', async () => {
    updateShopPage(
        await sorting(productList, (a: ProductAndElement, b: ProductAndElement) => {
            const test = a[0].masterVariant.prices[0].value.centAmount - b[0].masterVariant.prices[0].value.centAmount;
            return test;
        }),
        elements.sectionShopContainer
    );
});

export async function createShopPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    mainTag.append(elements.sortingPanel);
    mainTag.append(elements.sectionShop);
    elements.sectionShop.append(elements.sectionShopContainer);

    await updateShopPage(productList, elements.sectionShopContainer);
}
