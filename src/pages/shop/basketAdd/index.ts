import axios from 'axios';

export async function createBasket(): Promise<string> {
    const response = await axios.post(
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

    console.log(await response);
    return response.data;
}
