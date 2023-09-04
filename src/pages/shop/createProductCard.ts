import { helpCreateEl } from '../global/global';
import { openWindow, closeWindow } from '../login';
import { Product } from './types';

export function createProductCard(data: Product, i: number): HTMLElement {
    const containerItem = helpCreateEl('div', 'shop-fish__container');

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

    description.innerText = `${data.description.en.split('   ')[0]}`;

    const costContainer = helpCreateEl('div', 'shop-fish__cost-container');
    containerItem.append(costContainer);

    const cost = helpCreateEl('p', 'shop-fish__cost');
    const discount = helpCreateEl('p', 'shop-second__cost');
    const currency = helpCreateEl('p', 'shop-fish__currency');
    costContainer.append(cost);
    costContainer.append(discount);
    costContainer.append(currency);

    const getSum = `${data.masterVariant.prices[0].value.centAmount}`;

    if (data.masterVariant.prices[0].discounted) {
        const discountSum = `${data.masterVariant.prices[0].discounted.value.centAmount}`;
        const discountPartFirst = discountSum.slice(0, -2);
        const discountPartSecond = discountSum.slice(discountSum.length - 2);
        discount.innerText = `${discountPartFirst},${discountPartSecond}`;
        currency.innerText = data.masterVariant.prices[0].value.currencyCode;

        const valuePartFirst = getSum.slice(0, -2);
        const valuePartSecond = getSum.slice(getSum.length - 2);

        cost.innerText = `${valuePartFirst},${valuePartSecond}`;
        currency.innerText = data.masterVariant.prices[0].value.currencyCode;
        cost.style.textDecoration = 'line-through';
        cost.style.fontSize = '16px';
    }

    if (!data.masterVariant.prices[0].discounted) {
        const valuePartFirst = getSum.slice(0, -2);
        const valuePartSecond = getSum.slice(getSum.length - 2);

        cost.innerText = `${valuePartFirst},${valuePartSecond}`;
        currency.innerText = data.masterVariant.prices[0].value.currencyCode;
    }

    const button = helpCreateEl('button', 'shop-fish__button');
    containerItem.append(button);
    button.innerText = 'add to cart';

    containerItem.addEventListener('click', (target) => {
        const mainPage = document.querySelector('.body-container') as HTMLElement;
        let background = helpCreateEl('div', 'card-fish__background');
        let card = helpCreateEl('div', 'card-fish__container');
        let cardTitle = helpCreateEl('h2', 'card-fish__title');
        let cardImgsContainer = helpCreateEl('div', 'card-fish__img-container');
        let cardDescribe = helpCreateEl('div', 'card-fish__description');
        let cardPrice = helpCreateEl('div', 'card-fish__price');
        let cardAddButton = helpCreateEl('button', 'card-fish__button');
        let cardExit = helpCreateEl('button', 'card-fish__exit');
        let cardDiscount = helpCreateEl('div', 'card-fish__discount');

        cardAddButton.textContent = 'Add to cart';
        cardExit.textContent = '×';

        data.masterVariant.images.forEach((el) => {
            let cardImg = helpCreateEl('img', 'card-fish__img') as HTMLImageElement;
            cardImg.src = `${el.url}`;
            cardImgsContainer.append(cardImg);
        });
        if (data.masterVariant.prices[0].discounted) {
            const discountSum = `${data.masterVariant.prices[0].discounted.value.centAmount}`;
            const discountPartFirst = discountSum.slice(0, -2);
            const discountPartSecond = discountSum.slice(discountSum.length - 2);
            cardDiscount.innerText = `${discountPartFirst},${discountPartSecond} USD`;

            cardPrice.style.textDecoration = 'line-through';
            cardPrice.style.fontSize = '16px';
        }
        const getCost = `${data.masterVariant.prices[0].value.centAmount}`;
        const costPartFirst = getCost.slice(0, -2);
        const costPartSecond = getCost.slice(getSum.length - 2);

        cardPrice.innerText = `${costPartFirst},${costPartSecond} USD`;

        background.append(card);
        card.append(cardTitle, cardImgsContainer, cardDescribe, cardAddButton, cardPrice, cardDiscount, cardExit);

        let leftButton = helpCreateEl('div', 'card-fish__arrow_left');
        cardImgsContainer.append(leftButton);
        leftButton.textContent = '➜';

        let rightButton = helpCreateEl('div', 'card-fish__arrow_right');
        cardImgsContainer.append(rightButton);
        rightButton.textContent = '➜';

        let trans = 0;
        leftButton.addEventListener('click', () => {
            if (trans !== 450) {
                trans += 450;
            }
            document.querySelectorAll('.card-fish__img').forEach((curImg) => {
                let curImg1 = curImg as HTMLElement;
                curImg1.style.transform = `translateX(${trans}px)`;
            });
        });
        rightButton.addEventListener('click', () => {
            if (trans !== -450) {
                trans -= 450;
            }
            document.querySelectorAll('.card-fish__img').forEach((curImg) => {
                let curImg1 = curImg as HTMLElement;
                curImg1.style.transform = `translateX(${trans}px)`;
            });
        });

        cardTitle.textContent = `${data.name.en}`;

        cardDescribe.textContent = `${data.description.en.split('   ')[1]}`;
        if (target.target !== button) {
            openWindow(background, mainPage);
        }
        background.addEventListener('click', (target2) => {
            if (target2.target === background) {
                closeWindow(background, mainPage);
            }
        });
        cardExit.addEventListener('click', (target3) => {
            if (target3.target === cardExit) {
                closeWindow(background, mainPage);
            }
        });
    });

    return containerItem;
}
