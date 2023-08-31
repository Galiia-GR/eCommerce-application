import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function getInfo() {
    const token = acessToken.toString();

    const response = await axios({
        url: 'https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}
