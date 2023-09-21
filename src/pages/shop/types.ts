export type Product = {
    id: string;
    categories: Array<{ id: string }>;
    name: { en: string };
    masterVariant: {
        images: Array<{ url: string }>;
        prices: Array<{
            value: { centAmount: number; currencyCode: string };
            discounted: { value: { centAmount: number; currencyCode: string } };
        }>;
    };
    slug: { en: string };
    description: { en: string };
};
export type ProductList = Array<Product>;
export type ProductAndElement = [Product, HTMLElement];
export type ProductComplianceList = Array<ProductAndElement>;
export type ParamsState = {
    filter: {
        category: string;
        color: string;
        getFilter: { (): null | string[] };
    };
    sort: {
        price: string;
        name: string;
        setPrice: { (): void };
        setName: { (): void };
        getSort: { (): null | string[] };
    };
    pagin: {
        limit: number;
        offset: { (): number };
        total: number;
        page: number;
        pageCount: { (): number };
        setPagin: { (page: number, total?: number): void };
    };
    paramsRecord: { (): Record<string, string | number | string[]> };
};

export type prodsCart = {
    id: string;
    discountCodes: Array<{
        id: string;
        typeId: string;
    }>;
    lineItems: Array<{
        productId: string;
        id: string;
        name: { en: string };
        price: {
            value: {
                currencyCode: string;
                centAmount: number;
            };
            discounted: {
                value: {
                    currencyCode: string;
                    centAmount: number;
                };
            };
        };
        value: { centAmount: number };
        quantity: number;
        variant: {
            images: Array<{ url: string }>;
        };
    }>;
    totalPrice: {
        centAmount: number;
    };
};
