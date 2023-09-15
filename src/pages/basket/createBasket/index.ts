import axios from 'axios';

export async function createBasket(): Promise<string> {
    let response;

    if (localStorage.getItem('accessToken')) {
        response = await axios.post(
            `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts`,
            {
                currency: 'USD',
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } else {
        response = await axios.post(
            `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts`,
            {
                currency: 'USD',
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('anonymousToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    console.log(await response.data);
    return response.data;
}
