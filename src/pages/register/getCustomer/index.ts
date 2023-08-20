import axios from 'axios';
import { getToken } from '../getBearerToken';

export async function getCustomer(id: string): Promise<object> {
    const token = (await getToken()).toString();

    const response = await axios({
        url: `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response);
    return response;
}
