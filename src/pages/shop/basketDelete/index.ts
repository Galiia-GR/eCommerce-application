import axios from 'axios';
import { getBasket } from 'src/pages/basket/getBasket';

export async function basketDelete(basketId: string): Promise<string> {
    let response;

    if (localStorage.getItem('accessToken')) {
        let basketDat = getBasket(String(localStorage.getItem('basket')));
        console.log(basketDat);
        try {
            response = await axios.post(
                `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                {
                    version: Number(localStorage.getItem('basketVersion')),
                    actions: [
                        {
                            action: 'removeLineItem',
                            lineItemId: '{{lineItemId}}',
                            quantity: 1,
                            externalPrice: {
                                currencyCode: 'EUR',
                                centAmount: 4000,
                            },
                            shippingDetailsToRemove: {
                                targets: [
                                    {
                                        addressKey: 'AddressKeyStringFromAddress',
                                        quantity: 2,
                                    },
                                ],
                            },
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
                            lineItemId: '{{lineItemId}}',
                            quantity: 1,
                            externalPrice: {
                                currencyCode: 'EUR',
                                centAmount: 4000,
                            },
                            shippingDetailsToRemove: {
                                targets: [
                                    {
                                        addressKey: 'AddressKeyStringFromAddress',
                                        quantity: 2,
                                    },
                                ],
                            },
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
                        lineItemId: '{{lineItemId}}',
                        quantity: 1,
                        externalPrice: {
                            currencyCode: 'EUR',
                            centAmount: 4000,
                        },
                        shippingDetailsToRemove: {
                            targets: [
                                {
                                    addressKey: 'AddressKeyStringFromAddress',
                                    quantity: 2,
                                },
                            ],
                        },
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
