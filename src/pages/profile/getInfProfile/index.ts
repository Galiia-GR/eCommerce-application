import axios from 'axios';
import { responseCustomer } from 'src/interfaces';

export async function getProfileInf(): Promise<responseCustomer> {
    const response = await axios.get('https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });
    console.log(response.data);
    return response.data;
}
