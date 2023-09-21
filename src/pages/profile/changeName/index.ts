import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function updateName(id: string, userName: string, userEmail: string, userDate: string): Promise<object> {
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
                {
                    action: 'changeEmail',
                    email: userEmail,
                },
                {
                    action: 'setDateOfBirth',
                    dateOfBirth: userDate,
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    await localStorage.setItem('version', response.data.version);
    let res = await response;
    return res;
}
