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

export async function createBasketPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionBasket = helpCreateEl('section', 'basket');
    const sectionBasketContainer = helpCreateEl('section', 'basket-scroll');
    mainTag.append(sectionBasketContainer);
    sectionBasketContainer.append(sectionBasket);
    await createBasket();

    const cartItems = await getBasket(`${localStorage.getItem('basket')}`).then((result) => {
        const response = result;
        return response;
    });

    const arrCartItems = cartItems?.lineItems;

    const basketContain = document.querySelector('.basket') as HTMLElement;

    const basketTitleContain = helpCreateEl('div', 'basket-contain');
    const basketTitle = helpCreateEl('h3', 'basket-title');
    const basketImg = helpCreateEl('img', 'basket-title-img') as HTMLImageElement;
    basketImg.src = icoCart;
    basketTitle.textContent = 'you cart';
    const tipPromo = helpCreateEl('p', 'promo');
    tipPromo.textContent = 'your promo code: GOLDEN';
    tipPromo.style.color = 'orange';

    basketTitleContain.append(basketImg, basketTitle, tipPromo);

    const productsBasketContain = helpCreateEl('div', 'products-basket');

    const inputPromocode = helpCreateEl('input', 'input-promocode') as HTMLInputElement;
    inputPromocode.setAttribute('placeholder', ' Input promo code here');

    const inputText = helpCreateEl('p', 'input-text');

    const totalSumContain = helpCreateEl('div', 'total-sum-container');
    const totalSum = helpCreateEl('p', 'total-sum');
    const totalSumPromo = helpCreateEl('p', 'total-sum');

    const totalButton = helpCreateEl('button', 'total-button');
    totalButton.textContent = 'confirm order';

    basketContain.append(basketTitleContain, productsBasketContain, totalSumContain);
    totalSumContain.append(inputPromocode, inputText, totalSum, totalSumPromo, totalButton);

    if (arrCartItems) {
        productsBasketContain.innerHTML = '';
        drawBasketItems(cartItems);
    }
    const sum = String(cartItems?.totalPrice.centAmount);
    const valuePartFirst = sum.slice(0, -2);
    const valuePartSecond = sum.slice(sum.length - 2);
    totalSum.textContent = `total ${valuePartFirst},${valuePartSecond} USD`;

    inputPromocode.addEventListener('input', async () => {
        const valueCode = inputPromocode.value;
        if (!valueCode) {
            inputText.textContent = '';
        } else if (valueCode === 'GOLDEN') {
            inputText.textContent = `success promo code ${valueCode}`;
            inputText.style.color = 'green';
            const cartItemsPromo = await basketPromo(String(localStorage.getItem('basket')), `${valueCode}`).then(
                (result) => {
                    const response = result;
                    return response;
                }
            );
            const arrCartItemsPromo = cartItemsPromo.lineItems;
            if (arrCartItemsPromo) {
                productsBasketContain.innerHTML = '';
                drawBasketItems(cartItemsPromo);
            }
            const sumPromo = String(cartItemsPromo?.totalPrice.centAmount);
            const valuePartFirstPromo = sumPromo.slice(0, -2);
            const valuePartSecondPromo = sumPromo.slice(sum.length - 2);
            totalSum.textContent = `total ${valuePartFirstPromo},${valuePartSecondPromo} USD`;

            console.log(cartItemsPromo);
        } else {
            inputText.textContent = `invalid promo code: ${valueCode}`;
            inputText.style.color = 'red';
        }
    });
}

function drawBasketItems(response: prodsCart) {
    const arrCartItems = response?.lineItems;
    console.log(arrCartItems);

    arrCartItems.forEach((el) => {
        const basketItem = helpCreateEl('div', 'basket-item');
        const imgProduct = helpCreateEl('img', 'product-img') as HTMLImageElement;
        imgProduct.src = `${el.variant.images[0].url}`;
        const titleProduct = helpCreateEl('p', 'product-title');
        titleProduct.textContent = `${el.name.en}`;
        const priceProductContain = helpCreateEl('div', 'product-price-container');
        const priceProduct = helpCreateEl('p', 'product-price');
        const priceDiscount = helpCreateEl('p', 'product-price-discount');
        const currency = `${el.price.value.currencyCode}`;

        if (el.price.discounted && el.price.discounted.value !== undefined) {
            const discountPrice = `${el.price.discounted.value.centAmount}`;
            const valuePartFirst = discountPrice.slice(0, -2);
            const valuePartSecond = discountPrice.slice(discountPrice.length - 2);
            priceDiscount.textContent = `${valuePartFirst},${valuePartSecond} ${currency}`;

            const getSum = `${el.price.value.centAmount}`;
            const valuePartFirstPrice = getSum.slice(0, -2);
            const valuePartSecondPrice = getSum.slice(getSum.length - 2);
            priceProduct.textContent = `${valuePartFirstPrice},${valuePartSecondPrice} ${currency}`;
            priceProduct.style.textDecoration = 'line-through';
            priceProduct.style.fontSize = '16px';
        } else {
            priceDiscount.textContent = '';
            const getSum = `${el.price.value.centAmount}`;
            const valuePartFirstPrice = getSum.slice(0, -2);
            const valuePartSecondPrice = getSum.slice(getSum.length - 2);
            priceProduct.textContent = `${valuePartFirstPrice},${valuePartSecondPrice} ${currency}`;
        }

        const howManyContainer = helpCreateEl('div', 'how-many-container');
        const buttonMinus = helpCreateEl('button', 'button-minus');
        const howMany = helpCreateEl('p', 'how-many-basket');
        howMany.textContent = `${el.quantity}`;
        buttonMinus.textContent = '-';
        buttonMinus.addEventListener('click', async () => {
            if (Number(howMany.textContent) !== 1) {
                howMany.textContent = await String(Number(howMany.textContent) - 1);
                await basketDeleteOne(String(localStorage.getItem('basket')), el.name.en);
            }
        });
        const buttonPlus = helpCreateEl('button', 'button-plus');
        buttonPlus.textContent = '+';
        buttonPlus.addEventListener('click', async () => {
            howMany.textContent = await String(Number(howMany.textContent) + 1);
            await basketAddOne(String(localStorage.getItem('basket')), el.productId);
        });
        const buttonDelete = helpCreateEl('img', 'button-delete') as HTMLImageElement;
        buttonDelete.src = icoDelete;
        buttonDelete.addEventListener('click', async () => {
            await basketDeleteAll(String(localStorage.getItem('basket')), el.name.en);
            createBasketPage();
        });

        priceProductContain.append(priceProduct, priceDiscount);

        basketItem.append(imgProduct, titleProduct, priceProductContain, howManyContainer);
        howManyContainer.append(buttonMinus, howMany, buttonPlus, buttonDelete);

        const productsBasketContain = document.querySelector('.products-basket');
        productsBasketContain?.append(basketItem);
    });
}
