import { ProductAndElement, ProductComplianceList } from './types';

export async function updateShopPage(productComplianceList: ProductComplianceList, Container: HTMLElement) {
    Container.innerHTML = '';
    productComplianceList.forEach((e: ProductAndElement): void => {
        Container.append(e[1]);
    });
}
