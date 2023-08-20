export interface countryObject {
    name: string;
    code: string;
}

export interface responseData {
    customer: responseCustomer;
}

export interface responseCustomer {
    id: string;
    name: string;
}
