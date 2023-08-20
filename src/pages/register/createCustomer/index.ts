import axios from 'axios';
import { responseData } from 'src/interfaces';
import { getToken } from '../getBearerToken';

export async function postCustomer(userEmail: string, userPassword: string): Promise<responseData> {
    const token = (await getToken()).toString();
    const response = await axios.post(
        'https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers',
        {
            email: userEmail,
            password: userPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}
