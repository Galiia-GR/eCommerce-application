import { ProductList, Product, ProductAndElement, ProductComplianceList } from './types';
import { createProductCard } from './createProductCard';
import { getSearch } from './searchProducts';
import { paramsState } from './paramsState';

export async function getProductList(productsArrEcom: ProductList): Promise<ProductComplianceList> {
    const productComplianceList: ProductComplianceList = productsArrEcom.map(
        (e: Product, i: number): ProductAndElement => {
            const r: ProductAndElement = [e, createProductCard(e, i)];
            return r;
        }
    );

    return productComplianceList;
}

export const allProductList = await getProductList(await getSearch(paramsState));

export const productList = await getProductList(await getSearch(paramsState));
