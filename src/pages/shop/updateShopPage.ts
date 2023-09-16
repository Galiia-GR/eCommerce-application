import { ProductAndElement, ProductComplianceList } from './types';
import { getSearch } from './searchProducts';
import { productList, getProductList } from './getProducts';
import { paramsState } from './paramsState';
import { elements } from './shopElements';

export async function updateShopPage(productComplianceList: ProductComplianceList, Container: HTMLElement) {
    Container.innerHTML = '';
    productComplianceList.forEach((e: ProductAndElement): void => {
        Container.append(e[1]);
    });
}

export async function updateShopPageWithParams(): Promise<void> {
    const productSort = await getSearch(paramsState);
    const productSortList = await getProductList(productSort);
    await updateShopPage(productSortList, elements.sectionShopContainer);
}

export async function smartUpdate(): Promise<void> {
    if (paramsState.filter.getFilter() === null && paramsState.sort.getSort() === null) {
        await updateShopPage(productList, elements.sectionShopContainer);
    } else {
        await updateShopPageWithParams();
    }
}
