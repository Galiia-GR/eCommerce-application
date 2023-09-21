import axios from 'axios';
import { responseData } from 'src/interfaces';
import { getCustomerToken } from './getBearerToken';

export async function signUpCustomer(userEmail: string, userPassword: string): Promise<responseData> {
    const token = (await getCustomerToken(userEmail, userPassword)).toString();
    const response = await axios.get('https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const customerfirstName = response.data.firstName;
    localStorage.setItem('version', response.data.version);
    return customerfirstName;
}
