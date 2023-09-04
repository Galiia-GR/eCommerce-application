import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function updateName(id: string, userName: string): Promise<object> {
    const token = acessToken.toString();
    const response = await axios.post(
        `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        {
            version: Number(localStorage.getItem('version')),
            actions: [
                {
                    action: 'setFirstName',
                    firstName: userName.split(' ')[0],
                },
                {
                    action: 'setLastName',
                    lastName: userName.split(' ')[1],
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
