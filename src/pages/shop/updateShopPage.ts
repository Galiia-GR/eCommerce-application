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
    productList.length = 0;
    productList.push(...(await getProductList(productSort)));
    await updateShopPage(productList, elements.sectionShopContainer);
}
