import axios from 'axios';
import { prodsCart } from '../../shop/types';

export async function basketPromoDel(basketId: string, id: string): Promise<prodsCart> {
    let response;

    if (localStorage.getItem('accessToken')) {
        try {
            response = await axios.post(
                `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me/carts/${basketId}`,
                {
                    version: Number(localStorage.getItem('basketVersion')),
                    actions: [
                        {
                            action: 'removeDiscountCode',
                            discountCode: {
                                typeId: 'discount-code',
                                id: `${id}`,
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
                            action: 'removeDiscountCode',
                            discountCode: {
                                typeId: 'discount-code',
                                id: `${id}`,
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
                        action: 'removeDiscountCode',
                        discountCode: {
                            typeId: 'discount-code',
                            id: `${id}`,
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
    console.log(await response, 'MMMM');
    return response.data;
}
