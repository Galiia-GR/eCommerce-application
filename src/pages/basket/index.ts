import { helpCreateEl } from '../global/global';
import { basketDeleteAll } from './basketDelall';
import { basketDeleteOne } from './basketDelone';
import { createBasket } from './createBasket';
import { getBasket } from './getBasket';
import icoDelete from '../../assets/images/delete.png';
import icoCart from '../../assets/images/cart.png';
import { basketPromo } from '../shop/basketPromo';
import { prodsCart } from '../shop/types';
import { basketAddOne } from './basketAddOne';
import { basketDeleteAllItems } from './deleteAll';

export async function createBasketPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionBasket = helpCreateEl('section', 'basket');
    const sectionBasketContainer = helpCreateEl('section', 'basket-scroll');
    mainTag.append(sectionBasketContainer);
    sectionBasketContainer.append(sectionBasket);
    await createBasket();

    const cartItems = getBasket(`${localStorage.getItem('basket')}`).then((result) => {
        const response = result;
        return response;
    });

    const productsCart = await cartItems;
    const arrCartItems = productsCart?.lineItems;

    const basketContain = document.querySelector('.basket') as HTMLElement;

    const basketTitleContain = helpCreateEl('div', 'basket-contain');
    const basketTitle = helpCreateEl('h3', 'basket-title');
    const basketImg = helpCreateEl('img', 'basket-title-img') as HTMLImageElement;
    basketImg.src = icoCart;
    basketTitle.textContent = 'Your cart';

    basketTitleContain.append(basketImg, basketTitle);

    const productsBasketContain = helpCreateEl('div', 'products-basket');

    const inputPromocode = helpCreateEl('input', 'input-promocode') as HTMLInputElement;
    inputPromocode.setAttribute('placeholder', ' Input promo code here');

    const inputText = helpCreateEl('p', 'input-text');

    const totalSumContain = helpCreateEl('div', 'total-sum-container');
    const totalSum = helpCreateEl('p', 'total-sum');
    const totalSumPromo = helpCreateEl('p', 'total-sum');

    const totalButton = helpCreateEl('button', 'total-button');
    totalButton.textContent = 'Clear basket';
    totalButton.addEventListener('click', async () => {
        basketDeleteAllItems(createBasketPage);
    });

    basketContain.append(basketTitleContain, productsBasketContain, totalSumContain);
    totalSumContain.append(inputPromocode, inputText, totalSum, totalSumPromo, totalButton);

    if (arrCartItems) {
        await drawBasketItems(productsCart);
        await createBasket();
    }
    const sum = String(productsCart?.totalPrice.centAmount);
    const valuePartFirst = sum.slice(0, -2);
    const valuePartSecond = sum.slice(sum.length - 2);
    totalSum.textContent = `total ${valuePartFirst},${valuePartSecond} USD`;

    inputPromocode.addEventListener('input', () => {
        const valueCode = inputPromocode.value;
        if (!valueCode) {
            inputText.textContent = '';
        } else if (valueCode === 'GOLDEN') {
            inputText.textContent = `Success promo code ${valueCode}`;
            inputText.style.color = 'green';
            basketPromo(String(localStorage.getItem('basket')), `${valueCode}`).then((result) => {
                console.log(result);
            });
        } else {
            inputText.textContent = `Invalid promo code ${valueCode}`;
            inputText.style.color = 'red';
        }
    });
}

function drawBasketItems(response: prodsCart) {
    const arrCartItems = response?.lineItems;
    arrCartItems.forEach((el) => {
        const basketItem = helpCreateEl('div', 'basket-item');
        const imgProduct = helpCreateEl('img', 'product-img') as HTMLImageElement;
        imgProduct.src = `${el.variant.images[0].url}`;
        const titleProduct = helpCreateEl('p', 'product-title');
        titleProduct.textContent = `${el.name.en}`;
        const priceProductContain = helpCreateEl('div', 'product-price-container');
        const priceProduct = helpCreateEl('p', 'product-price');
        const priceDiscount = helpCreateEl('p', 'product-price-discount');
        const getSum = `${el.price.value.centAmount}`;
        console.log(getSum);
        const valuePartFirst = getSum.slice(0, -2);
        const valuePartSecond = getSum.slice(getSum.length - 2);

        const currency = `${el.price.value.currencyCode}`;
        priceProduct.textContent = `${valuePartFirst},${valuePartSecond} ${currency}`;
        priceDiscount.textContent = 'promo';
        priceProductContain.append(priceProduct, priceDiscount);

        const howManyContainer = helpCreateEl('div', 'how-many-container');
        const buttonMinus = helpCreateEl('button', 'button-minus');
        const howMany = helpCreateEl('p', 'how-many-basket');
        howMany.textContent = `${el.quantity}`;
        buttonMinus.textContent = '-';
        buttonMinus.addEventListener('click', async () => {
            if (Number(howMany.textContent) !== 1) {
                howMany.textContent = await String(Number(howMany.textContent) - 1);
                await basketDeleteOne(String(localStorage.getItem('basket')), el.name.en);
                await createBasketPage();
            }
        });
        const buttonPlus = helpCreateEl('button', 'button-plus');
        buttonPlus.textContent = '+';
        buttonPlus.addEventListener('click', async () => {
            howMany.textContent = await String(Number(howMany.textContent) + 1);
            await basketAddOne(String(localStorage.getItem('basket')), el.productId);
            await createBasketPage();
        });
        const buttonDelete = helpCreateEl('img', 'button-delete') as HTMLImageElement;
        buttonDelete.src = icoDelete;
        buttonDelete.addEventListener('click', async () => {
            await basketDeleteAll(String(localStorage.getItem('basket')), el.name.en);
            await createBasketPage();
        });

        basketItem.append(imgProduct, titleProduct, priceProductContain, howManyContainer);
        howManyContainer.append(buttonMinus, howMany, buttonPlus, buttonDelete);

        const productsBasketContain = document.querySelector('.products-basket');
        productsBasketContain?.append(basketItem);
    });
}
