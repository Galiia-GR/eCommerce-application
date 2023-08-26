import axios from 'axios';
import { responseData } from 'src/interfaces';

let clientId = 'ZRQmbO9VlpcxkW02x53wkkKs';
let clientSecret = '92GxY9MdGYusDRy-h9d6rtXKxtE7cm8Y';

export async function getCustomerToken(userEmail: string, userPassword: string): Promise<responseData> {
    const response = await axios({
        url: 'https://auth.us-central1.gcp.commercetools.com/oauth/ecommercerszxc22845345034582/customers/token',
        method: 'post',
        params: {
            grant_type: 'password',
            username: userEmail,
            password: userPassword,
            scope: 'manage_project:ecommercerszxc22845345034582',
        },
        headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    console.log(response.data.refresh_token);
    return response.data.access_token;
}
