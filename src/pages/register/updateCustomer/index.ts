import axios from 'axios';
import { getToken } from '../getBearerToken';

export async function updateCustomer(
    id: string,
    userFirstName: string,
    userLastName: string,
    userStreetName: string,
    userPostalCode: string,
    userCity: string,
    userCountry: string,
    userEmail: string,
    userDate: string
): Promise<object> {
    const token = (await getToken()).toString();
    const streetCode: string[] = [];
    const streetName: string[] = [];
    await userStreetName.split('').forEach((step) => {
        if ('QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'.includes(step)) {
            streetName.push(step);
        } else if ('1234567890'.includes(step)) {
            streetCode.push(step);
        }
    });
    const response = await axios.post(
        `https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/customers/${id}`,
        {
            version: 1,
            actions: [
                {
                    action: 'setFirstName',
                    firstName: userFirstName,
                },
                {
                    action: 'setLastName',
                    lastName: userLastName,
                },
                {
                    action: 'addAddress',
                    address: {
                        title: 'My Address',
                        firstName: userFirstName,
                        lastName: userLastName,
                        streetName: streetName.join(''),
                        streetNumber: streetCode.join(''),
                        postalCode: userPostalCode,
                        city: userCity,
                        country: userCountry[userCountry.length - 2] + userCountry[userCountry.length - 1],
                        email: userEmail,
                    },
                },
                {
                    action: 'setDateOfBirth',
                    dateOfBirth: userDate,
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
}
