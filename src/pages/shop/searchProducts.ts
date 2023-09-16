import axios from 'axios';
import { acessToken } from '../register/getBearerToken';
import { ProductList, ParamsState } from './types';

export async function getSearch(options: ParamsState): Promise<ProductList> {
    const token = acessToken.toString();

    const params: Record<string, string | number | string[]> = options.paramsRecord();

    console.log('?????????????????');

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
