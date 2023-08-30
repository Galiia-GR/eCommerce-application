export interface countryObject {
    name: string;
    code: string;
}

export interface responseData {
    customer: responseCustomer;
}

interface responseAdress {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
    streetNumber: string;
}

export interface responseCustomer {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: responseAdress[];
    email: string;
}
