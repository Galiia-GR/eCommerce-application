import { ProductAndElement, ProductComplianceList } from './types';
//  import { getSearch } from './searchProducts';

export async function sorting(
    list: ProductComplianceList,
    fn: (a: ProductAndElement, b: ProductAndElement) => number
): Promise<ProductComplianceList> {
    const listCopy: ProductComplianceList = [...list];
    return listCopy.sort(fn);
}
