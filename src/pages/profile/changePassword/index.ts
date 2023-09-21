import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function updatePassword(id1: string, currentPassword1: string, newPassword1: string): Promise<object> {
    const token = acessToken.toString();
    const response = await axios.post(
        `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/password`,
        {
            id: id1,
            version: Number(localStorage.getItem('version')),
            currentPassword: currentPassword1,
            newPassword: newPassword1,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    await localStorage.setItem('version', response.data.version);
    let res = await response;
    return res;
}
