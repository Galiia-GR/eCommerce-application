import axios from 'axios';
import { acessToken } from '../register/getBearerToken';

export async function getProducts(): Promise<
    Array<{
        name: { en: string };
        masterVariant: {
            images: Array<{ url: string }>;
            prices: Array<{ value: { centAmount: number; currencyCode: string } }>;
        };
        description: { en: string };
    }>
> {
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
