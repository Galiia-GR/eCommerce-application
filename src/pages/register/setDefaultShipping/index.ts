import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function updateDefShippingCustomer(id: string, dataId: string): Promise<object> {
    const token = acessToken.toString();
    const response = await axios.post(
        `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        {
            version: 5,
            actions: [
                {
                    action: 'setDefaultShippingAddress',
                    addressId: dataId,
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
}
