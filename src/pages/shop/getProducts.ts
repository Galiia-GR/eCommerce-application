import axios from 'axios';
import { acessToken } from '../register/getBearerToken';
import { ProductList, Product, ProductAndElement, ProductComplianceList } from './types';
import { createProductCard } from './createProductCard';

export async function getProducts(): Promise<ProductList> {
    const token = acessToken.toString();

    const response = await axios({
        url: `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/product-projections`,
        method: 'get',
        params: {
            limit: 500,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const productsArrEcom = response.data.results;
    return productsArrEcom;
}

export async function getProductList(productsArrEcom: ProductList): Promise<ProductComplianceList> {
    const productComplianceList: ProductComplianceList = productsArrEcom.map(
        (e: Product, i: number): ProductAndElement => {
            const r: ProductAndElement = [e, createProductCard(e, i)];
            return r;
        }
    );

    return productComplianceList;
}

export const productList = await getProductList(await getProducts());
