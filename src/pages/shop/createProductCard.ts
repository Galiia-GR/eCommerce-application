import { helpCreateEl } from '../global/global';
import { openWindow } from '../login';
import { Product } from './types';
import { basketAdd } from './basketAdd';
import icoDelete from '../../assets/images/delete.png';

export function createProductCard(data: Product, i: number): HTMLElement {
    let cardFishOpen = false;

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

    const howManyContainer = helpCreateEl('div', 'how-many-container');
    containerItem.append(howManyContainer);

    const buttonMinus = helpCreateEl('button', 'button-minus');
    const howMany = helpCreateEl('p', 'how-many');
    howMany.textContent = '1';
    buttonMinus.textContent = '-';
    const buttonPlus = helpCreateEl('button', 'button-plus');
    buttonPlus.textContent = '+';
    const buttonDelete = helpCreateEl('img', 'button-delete') as HTMLImageElement;
    buttonDelete.src = icoDelete;
    howManyContainer.append(buttonMinus, howMany, buttonPlus, buttonDelete);

    let currentCount = 1;
    buttonMinus.addEventListener('click', () => {
        if (howMany.textContent !== '1') {
            currentCount -= 1;
            howMany.textContent = String(currentCount);
        }
    });
    buttonPlus.addEventListener('click', () => {
        currentCount += 1;
        howMany.textContent = String(currentCount);
    });

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

    button.addEventListener('click', () => {
        basketAdd(String(localStorage.getItem('basket')), data.id, Number(howMany.textContent));
    });

    containerItem.addEventListener('click', (target) => {
        if (
            target.target !== button &&
            target.target !== buttonMinus &&
            target.target !== buttonPlus &&
            target.target !== buttonDelete
        ) {
            const mainPage = document.querySelector('.body-container') as HTMLElement;
            let background = helpCreateEl('div', 'card-fish__background');
            let card = helpCreateEl('div', 'card-fish__container');
            let cardTitle = helpCreateEl('h2', 'card-fish__title');
            let cardImgsContainer = helpCreateEl('div', 'card-fish__img-container');
            let cardDescribe = helpCreateEl('div', 'card-fish__description');
            let cardPrice = helpCreateEl('div', 'card-fish__price');
            let cardAddButton = helpCreateEl('button', 'card-fish__button');
            let contHowMany = helpCreateEl('div', 'how-many-contain');
            let buttonMin = helpCreateEl('button', 'button-minus');
            let buttonDel = helpCreateEl('img', 'button-delete') as HTMLImageElement;
            buttonDel.src = icoDelete;
            let count = helpCreateEl('p', 'how-many');
            let buttonPl = helpCreateEl('button', 'button-plus');
            let cardExit = helpCreateEl('button', 'card-fish__exit');
            let cardDiscount = helpCreateEl('div', 'card-fish__discount');
            contHowMany.append(buttonMin, count, buttonPl, buttonDel);

            cardExit.textContent = '×';
            buttonMin.textContent = '-';
            buttonPl.textContent = '+';
            count.textContent = '1';

            let curCount = 1;
            buttonMin.addEventListener('click', () => {
                if (count.textContent !== '1') {
                    curCount -= 1;
                    count.textContent = String(curCount);
                }
            });
            buttonPl.addEventListener('click', () => {
                curCount += 1;
                count.textContent = String(curCount);
            });

            cardAddButton.textContent = 'Add to cart';
            cardAddButton.addEventListener('click', () => {
                basketAdd(String(localStorage.getItem('basket')), data.id, Number(count.textContent)).then((result) => {
                    console.log(result);
                });
            });

            data.masterVariant.images.forEach((el) => {
                let cardImg = helpCreateEl('img', 'card-fish__img') as HTMLImageElement;
                cardImg.src = `${el.url}`;
                let large = false;
                cardImg.addEventListener('click', () => {
                    if (large === false) {
                        large = true;
                        cardImg.style.transition = '0s';
                        cardImg.style.position = 'absolute';
                        cardImg.style.zIndex = '100';
                        cardImg.style.height = '100%';
                        cardImg.style.width = '100%';
                        cardImg.style.bottom = '0px';
                        cardImg.style.transform = 'translateX(0px)';
                    } else {
                        large = false;
                        cardImg.style.height = '250px';
                        cardImg.style.width = '450px';
                        cardImg.style.zIndex = '';
                        cardImg.style.position = '';
                        cardImg.style.bottom = '';
                        cardImg.style.transform = `translateX(${Number(sessionStorage.getItem('width'))}px)`;
                        setTimeout(() => {
                            cardImg.style.transition = '';
                        }, 100);
                    }
                });
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
            card.append(
                cardTitle,
                cardImgsContainer,
                cardDescribe,
                cardAddButton,
                cardPrice,
                contHowMany,
                cardDiscount,
                cardExit
            );

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
                    sessionStorage.setItem('width', `${trans}`);
                }
                document.querySelectorAll('.card-fish__img').forEach((curImg) => {
                    let curImg1 = curImg as HTMLElement;
                    curImg1.style.transform = `translateX(${trans}px)`;
                });
            });
            rightButton.addEventListener('click', () => {
                if (trans !== -450) {
                    trans -= 450;
                    sessionStorage.setItem('width', `${trans}`);
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
                    sessionStorage.setItem('width', '0');
                    window.location.hash = `/shop`;
                    mainPage.querySelectorAll('.card-fish__background').forEach((cl) => {
                        mainPage.removeChild(cl);
                    });
                }
            });
            cardExit.addEventListener('click', (target3) => {
                if (target3.target === cardExit) {
                    sessionStorage.setItem('width', '0');
                    window.location.hash = `/shop`;
                    mainPage.querySelectorAll('.card-fish__background').forEach((cl) => {
                        mainPage.removeChild(cl);
                    });
                }
            });

            cardFishOpen = true;
            if (cardFishOpen) {
                const getUrl = data.slug.en;
                console.log(getUrl);

                window.location.hash = `/shop/${getUrl}`;
            }
        }
    });

    return containerItem;
}
