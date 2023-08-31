import { helpCreateEl } from '../global/global';
import { getProducts } from './getProducts';

export async function createShopPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionShop = helpCreateEl('section', 'shop');
    const sectionShopContainer = helpCreateEl('div', 'shop-container');
    mainTag.append(sectionShop);
    sectionShop.append(sectionShopContainer);

    const productsArrEcom = await getProducts();

    console.log(productsArrEcom);

    for (let i = 0; i < productsArrEcom.length; i += 1) {
        const containerItem = helpCreateEl('div', 'shop-fish__container');
        const data = productsArrEcom[i];

        sectionShopContainer.append(containerItem);
        containerItem.setAttribute('id', `${i}`);

        const title = helpCreateEl('h3', 'shop-fish__title');
        containerItem.appendChild(title);

        const item = helpCreateEl('div', 'shop-fish__item');
        containerItem.append(item);

        title.innerText = `${data.name.en}`;

        const img = helpCreateEl('img', 'shop-fish__img') as HTMLImageElement;
        item.append(img);

        img.src = `${data.masterVariant.images[0].url}`;

        const description = helpCreateEl('div', 'shop-fish__description');
        containerItem.append(description);

        description.innerText = `${data.description.en}`;

        const costContainer = helpCreateEl('div', 'shop-fish__cost-container');
        containerItem.append(costContainer);

        const cost = helpCreateEl('p', 'shop-fish__cost');
        const currency = helpCreateEl('p', 'shop-fish__currency');
        costContainer.append(cost);
        costContainer.append(currency);

        const getSum = `${data.masterVariant.prices[0].value.centAmount}`;
        const valuePartFirst = getSum.slice(0, -2);
        const valuePartSecond = getSum.slice(getSum.length - 2);

        cost.innerText = `${valuePartFirst},${valuePartSecond}`;
        currency.innerText = data.masterVariant.prices[0].value.currencyCode;

        const button = helpCreateEl('button', 'shop-fish__button');
        containerItem.append(button);
        button.innerText = 'add to cart';
    }
}
