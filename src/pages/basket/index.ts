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
import { basketPromoDel } from '../basket/basketPromoDel';

export async function createBasketPage() {
    let totalTemp: string;
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
    tipPromo.style.color = 'orange';

    basketTitleContain.append(basketImg, basketTitle, tipPromo);

    const productsBasketContain = helpCreateEl('div', 'products-basket');

    const inputPromocode = helpCreateEl('input', 'input-promocode') as HTMLInputElement;
    inputPromocode.setAttribute('placeholder', ' Input promo code here');
    const buttonDelPromo = helpCreateEl('button', 'button-promo');
    buttonDelPromo.textContent = 'remove promo';

    const inputText = helpCreateEl('p', 'input-text');

    const totalSumContain = helpCreateEl('div', 'total-sum-container');
    const totalSum = helpCreateEl('p', 'total-sum');
    const totalSumPromo = helpCreateEl('p', 'total-sum');

    const totalButton = helpCreateEl('button', 'total-button');
    totalButton.textContent = 'confirm order';

    basketContain.append(basketTitleContain, productsBasketContain, totalSumContain);
    totalSumContain.append(inputPromocode, inputText, buttonDelPromo, totalSum, totalSumPromo, totalButton);

    if (arrCartItems) {
        productsBasketContain.innerHTML = '';
        drawBasketItems(cartItems);
    }
    if (cartItems?.discountCodes.length === 0) {
        const sum = String(cartItems?.totalPrice.centAmount);
        const valuePartFirst = sum.slice(0, -2);
        const valuePartSecond = sum.slice(sum.length - 2);
        totalSum.textContent = `total ${valuePartFirst},${valuePartSecond} USD`;
        totalTemp = totalSum.textContent;
        console.log(totalTemp);
    } else {
        const sum = String(cartItems?.totalPrice.centAmount);
        const valuePartFirst = sum.slice(0, -2);
        const valuePartSecond = sum.slice(sum.length - 2);
        totalSumPromo.textContent = `total promo ${valuePartFirst},${valuePartSecond} USD`;
        totalSumPromo.style.color = 'green';
    }
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
            const sumPromo = String(cartItemsPromo?.totalPrice.centAmount);
            const valuePartFirstPromo = sumPromo.slice(0, -2);
            const valuePartSecondPromo = sumPromo.slice(sumPromo.length - 2);
            totalSumPromo.textContent = `total promo ${valuePartFirstPromo},${valuePartSecondPromo} USD`;
            totalSumPromo.style.color = 'green';
            const arrCartItemsPromo = cartItemsPromo.lineItems;

            if (arrCartItemsPromo) {
                productsBasketContain.innerHTML = '';
                tipPromo.textContent = 'you can use promo code: GOLDEN';
                drawBasketItems(cartItemsPromo);
            }
        } else {
            inputText.textContent = `invalid promo code: ${valueCode}`;
            inputText.style.color = 'red';
        }
    });

    buttonDelPromo.addEventListener('click', async () => {
        const idPromo = '052950f4-8ed1-4a73-9e35-86e6ed7df706';
        const cartItemsPromoDel = await basketPromoDel(String(localStorage.getItem('basket')), `${idPromo}`).then(
            (result) => {
                const response = result;
                return response;
            }
        );
        console.log(cartItemsPromoDel);

        if (cartItemsPromoDel?.discountCodes.length === 0) {
            console.log(true);

            const sum = String(cartItems?.totalPrice.centAmount);
            const valuePartFirst = sum.slice(0, -2);
            const valuePartSecond = sum.slice(sum.length - 2);
            totalSum.textContent = `total ${valuePartFirst},${valuePartSecond} USD`;
            totalTemp = totalSum.textContent;
            totalSumPromo.textContent = '';
            tipPromo.textContent = '';
            inputText.textContent = '';
            inputPromocode.value = '';
        }
    });
}

function drawBasketItems(response: prodsCart) {
    const promo = document.querySelector('.promo') as HTMLElement;
    const arrCartItems = response?.lineItems;
    if (arrCartItems.length === 0) {
        const basketTitle = document.querySelector('.basket-title') as HTMLElement;
        basketTitle.textContent = 'Your cart is empty';
        const goShop = helpCreateEl('button', 'button-go-shop');
        goShop.textContent = 'Shopping';
        basketTitle.appendChild(goShop);
        goShop.addEventListener('click', () => {
            window.location.hash = '/shop';
        });
    } else {
        promo.textContent = 'you can use promo code: GOLDEN';
    }

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
