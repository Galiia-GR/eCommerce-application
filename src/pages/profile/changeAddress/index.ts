import axios from 'axios';
import { acessToken } from '../getBearerToken';

export async function updateAddress(
    id: string,
    adressId: string,
    street: string,
    streetNum: string,
    postal: string,
    userCity: string,
    userCountry: string
): Promise<object> {
    const token = acessToken.toString();
    const response = await axios.post(
        `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        {
            version: Number(localStorage.getItem('version')),
            actions: [
                {
                    action: 'changeAddress',
                    addressId: adressId,
                    address: {
                        streetName: street,
                        streetNumber: streetNum,
                        postalCode: postal,
                        city: userCity,
                        country: userCountry,
                    },
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    await localStorage.setItem('version', response.data.version);
    let res = await response;
    return res;
}
