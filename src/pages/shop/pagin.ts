import { getSearch } from './searchProducts';
import { paramsState } from './paramsState';
import { productList, getProductList } from './getProducts';
import { updateShopPage } from './updateShopPage';
import { elements } from './shopElements';

export async function pageChange(n: number): Promise<void> {
    const oldPage = paramsState.pagin.page;
    paramsState.pagin.setPagin(oldPage + n);
    if (oldPage !== paramsState.pagin.page) {
        productList.length = 0;
        productList.push(...(await getProductList(await getSearch(paramsState))));
        updateShopPage(productList, elements.sectionShopContainer);
    }
}
