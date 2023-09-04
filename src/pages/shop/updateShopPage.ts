import { ProductAndElement, ProductComplianceList } from './types';

export async function updateShopPage(productComplianceList: ProductComplianceList, Container: HTMLElement) {
    Container.innerHTML = '';
    console.log(productComplianceList);
    productComplianceList.forEach((e: ProductAndElement): void => {
        Container.append(e[1]);
    });
}
