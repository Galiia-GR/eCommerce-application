import axios from 'axios';

export async function getToken(): Promise<string> {
    const access = await axios({
        url: 'https://ZRQmbO9VlpcxkW02x53wkkKs:92GxY9MdGYusDRy-h9d6rtXKxtE7cm8Y@auth.us-central1.gcp.commercetools.com/oauth/token',
        method: 'post',
        params: {
            grant_type: 'client_credentials',
            scope: 'manage_project:ecommercerszxc22845345034582',
        },
        auth: {
            username: 'ZRQmbO9VlpcxkW02x53wkkKs',
            password: '92GxY9MdGYusDRy-h9d6rtXKxtE7cm8Y',
        },
    });

    return access.data.access_token;
}
