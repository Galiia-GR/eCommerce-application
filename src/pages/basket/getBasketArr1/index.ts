import axios from 'axios';

export async function getBasketArr1(basketId: string): Promise<[] | undefined> {
    if (localStorage.getItem('basket')) {
        let response;

        if (localStorage.getItem('accessToken')) {
            try {
                response = await axios.get(
                    `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            } catch {
                response = await axios.get(
                    `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('anonymousToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }
        } else {
            response = await axios.get(
                `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('anonymousToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        localStorage.setItem('basketVersion', response.data.version);
        console.log(await response.data);
        return response.data.lineItems;
    }
    return undefined;
}
