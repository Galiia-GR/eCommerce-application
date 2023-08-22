import axios from 'axios';
import { getToken } from '../getBearerToken';

export async function updateBillingCustomer(id: string, dataId: string): Promise<object> {
    const token = (await getToken()).toString();
    const response = await axios.post(
        `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        {
            version: 6,
            actions: [
                {
                    action: 'addBillingAddressId',
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

    console.log(response);
    return response;
}
