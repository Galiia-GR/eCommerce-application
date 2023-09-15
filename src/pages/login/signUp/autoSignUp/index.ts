import axios from 'axios';

let clientId = 'ZRQmbO9VlpcxkW02x53wkkKs';
let clientSecret = '92GxY9MdGYusDRy-h9d6rtXKxtE7cm8Y';

export async function autoSignUpCustomer(): Promise<void> {
    const loginOpen = document.querySelector('.LOGIN') as HTMLElement;
    if (localStorage.getItem('accessToken')) {
        const response = await axios.get(
            'https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const customerfirstName = response.data.firstName;
        const customerHeaderUserEl = document.querySelector('.logo-userName') as HTMLElement;
        localStorage.setItem('version', response.data.version);
        customerHeaderUserEl.textContent = `Home ${customerfirstName}`;
        loginOpen.textContent = 'LOG OUT';
    } else {
        if (localStorage.getItem('anonymousToken')) {
            return undefined;
        }
        const response1 = await axios({
            url: 'https://auth.us-central1.gcp.commercetools.com/oauth/ecommercerszxc22845345034582/anonymous/token',
            method: 'post',
            params: {
                grant_type: 'client_credentials',
                scope: 'manage_project:ecommercerszxc22845345034582',
            },
            headers: {
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        localStorage.setItem('anonymousToken', response1.data.access_token);
    }

    return undefined;
}

autoSignUpCustomer();
