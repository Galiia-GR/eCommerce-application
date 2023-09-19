import { getBasketArr1 } from '../getBasketArr1';
import { basketDeleteAll } from '../basketDelall';

interface arrEl {
    name: {
        en: string;
    };
    id: string;
    quantity: number;
    productId: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function basketDeleteAllItems(func: Function): Promise<undefined> {
    const basketDat = (await getBasketArr1(String(localStorage.getItem('basket')))) as [];
    let i = 1;

    basketDat.forEach(async (el: arrEl) => {
        setTimeout(async () => {
            await basketDeleteAll(String(localStorage.getItem('basket')), String(el.name.en));
            await func();
        }, 1000 * i);
        i += 1;
    });
    return undefined;
}
