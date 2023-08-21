import axios from 'axios';
import { responseData } from 'src/interfaces';
import { getToken } from './getBearerToken';

export async function signUpCustomer(userEmail: string, userPassword: string): Promise<responseData> {
    const token = (await getToken()).toString();
    const response = await axios.post(
        'https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/login',
        {
            email: userEmail,
            password: userPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    console.log(response.data);
    const customerfirstName = response.data.customer.firstName;
    return customerfirstName;
}
