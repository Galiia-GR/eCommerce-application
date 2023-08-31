import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function getCustomer(id: string, num: number): Promise<string> {
    const token = acessToken.toString();

    const response = await axios({
        url: `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.addresses[num].id;
}
