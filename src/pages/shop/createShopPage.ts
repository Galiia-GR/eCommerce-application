import { helpCreateEl } from '../global/global';
import { getProducts } from './getProducts';
import { createProductCard } from './createProductCard';
import { ProductList, ProductAndElement, ProductComplianceList } from './types';

const mainTag = document.querySelector('.main') as HTMLElement;
const sectionShop = helpCreateEl('section', 'shop');
const sectionShopContainer = helpCreateEl('div', 'shop-container');

async function getProductList(productsArrEcom: ProductList): Promise<ProductComplianceList> {
    const productComplianceList: ProductComplianceList = [];

    for (let i = 0; i < productsArrEcom.length; i += 1) {
        productComplianceList.push([productsArrEcom[i], createProductCard(productsArrEcom[i], i)]);
        console.log(i);
    }
    return productComplianceList;
}

const productList = await getProductList(await getProducts());

async function updateShopPage(productComplianceList: ProductComplianceList, Container: HTMLElement) {
    Container.innerHTML = '';
    productComplianceList.forEach((e: ProductAndElement): void => {
        Container.append(e[1]);
    });
}

export async function createShopPage() {
    mainTag.innerHTML = '';
    mainTag.append(sectionShop);
    sectionShop.append(sectionShopContainer);

    await updateShopPage(productList, sectionShopContainer);
}
