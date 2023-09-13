import axios from 'axios';
import { acessToken } from '../register/getBearerToken';
import { ProductList } from './types';

export async function getSearch(options: {
    data?: string;
    value?: string;
    categoryId?: string;
    priceRange?: string;
    color?: string;
}): Promise<ProductList> {
    const token = acessToken.toString();

    const { categoryId, data, value, color } = options;
    const filters: string[] = [];
    if (categoryId) {
        filters.push(`categories.id: subtree("${categoryId}")`);
    }

    if (color) {
        filters.push(`categories.id: subtree("${color}")`);
    }

    const params: Record<string, string | number | string[]> = {
        limit: 500,
        filter: filters,
    };
    if (data && value) {
        params.sort = `${data} ${value}`;
    }

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
