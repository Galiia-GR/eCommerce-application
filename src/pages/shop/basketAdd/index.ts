import axios from 'axios';

export async function basketAdd(basketId: string, productId: string): Promise<string> {
    let response;

    if (localStorage.getItem('accessToken')) {
        try {
            response = await axios.post(
                `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                {
                    version: Number(localStorage.getItem('basketVersion')),
                    actions: [
                        {
                            action: 'addLineItem',
                            productId: productId,
                            variantId: 1,
                            quantity: 1,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch {
            response = await axios.post(
                `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                {
                    version: Number(localStorage.getItem('basketVersion')),
                    actions: [
                        {
                            action: 'addLineItem',
                            productId: productId,
                            variantId: 1,
                            quantity: 1,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('anonymousToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
    } else {
        response = await axios.post(
            `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
            {
                version: Number(localStorage.getItem('basketVersion')),
                actions: [
                    {
                        action: 'addLineItem',
                        productId: productId,
                        variantId: 1,
                        quantity: 1,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('anonymousToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    localStorage.setItem('basketVersion', response.data.version);
    console.log(await response);
    return response.data;
}
