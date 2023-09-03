export type Product = {
    name: { en: string };
    masterVariant: {
        images: Array<{ url: string }>;
        prices: Array<{ value: { centAmount: number; currencyCode: string } }>;
    };
    description: { en: string };
};
export type ProductList = Array<Product>;
export type ProductAndElement = [Product, HTMLElement];
export type ProductComplianceList = Array<ProductAndElement>;
