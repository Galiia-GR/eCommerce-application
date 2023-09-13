export interface countryObject {
    name: string;
    code: string;
}

export interface responseData {
    customer: responseCustomer;
}

export interface responseAdress {
    id: string;
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
    billingAddressIds: string[];
    shippingAddressIds: string[];
    defaultShippingAddressId: string;
    defaultBillingAddressId: string;
}
