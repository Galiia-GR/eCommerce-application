import axios from 'axios';
import { getBasketArr } from '../getBasketArr';

interface arrEl {
    name: {
        en: string;
    };
    id: string;
    quantity: number;
}

export async function basketDelete(
    basketId: string,
    itemName: string,
    itemQuantity: string
): Promise<string | undefined> {
    let response;
    let basId;

    const basketDat = (await getBasketArr(String(localStorage.getItem('basket')))) as [];
    let itemQuantityFix = Number(itemQuantity);

    basketDat.forEach((el: arrEl) => {
        if (el.name.en === itemName) {
            if (itemQuantityFix > el.quantity) {
                itemQuantityFix = el.quantity;
            }
            basId = el.id;
        }
    });

    if (basId) {
        if (localStorage.getItem('accessToken')) {
            try {
                response = await axios.post(
                    `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                    {
                        version: Number(localStorage.getItem('basketVersion')),
                        actions: [
                            {
                                action: 'removeLineItem',
                                lineItemId: `${basId}`,
                                quantity: Number(itemQuantityFix),
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
                                action: 'removeLineItem',
                                lineItemId: `${basId}`,
                                quantity: Number(itemQuantityFix),
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
                            action: 'removeLineItem',
                            lineItemId: `${basId}`,
                            quantity: Number(itemQuantityFix),
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
    return undefined;
}
