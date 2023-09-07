import axios from 'axios';
import { acessToken } from '../register/getBearerToken';
import { ProductList } from './types';

export async function getSearch(options: {
    data?: string;
    value?: string;
    categoryId?: string;
    color?: string;
    type?: string;
    maxPrice?: number;
}): Promise<ProductList> {
    const token = acessToken.toString();

    const { categoryId } = options;
    const filters: string[] = [];

    filters.push(`categories.id: subtree("${categoryId}")`);

    const params: Record<string, string | number | string[]> = {
        limit: 500,
        filter: filters,
    };

    const response = await axios({
        url: `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/product-projections/search`,
        method: 'get',
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const productsArrEcom = response.data.results;

    return productsArrEcom;
}
