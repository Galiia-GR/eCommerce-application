import { helpCreateEl } from '../global/global';
import { createBasket } from './createBasket';
import { getBasket } from './getBasket';
import icoDelete from '../../assets/images/delete.png';
import icoCart from '../../assets/images/cart.png';
//  import { prodsCart } from '../shop/types';

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
    basketTitle.textContent = 'you cart';

    basketTitleContain.append(basketImg, basketTitle);

    const productsBasketContain = helpCreateEl('div', 'products-basket');

    const totalSumContain = helpCreateEl('div', 'total-sum-container');
    const totalSum = helpCreateEl('p', 'total-sum');

    totalSum.textContent = 'USD';
    const totalButton = helpCreateEl('button', 'total-button');
    totalButton.textContent = 'confirm order';

    basketContain.append(basketTitleContain, productsBasketContain, totalSumContain);
    totalSumContain.append(totalSum, totalButton);

    if (arrCartItems) {
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
            const buttonPlus = helpCreateEl('button', 'button-plus');
            buttonPlus.textContent = '+';
            const buttonDelete = helpCreateEl('img', 'button-delete') as HTMLImageElement;
            buttonDelete.src = icoDelete;

            basketItem.append(imgProduct, titleProduct, priceProductContain, howManyContainer);
            howManyContainer.append(buttonMinus, howMany, buttonPlus, buttonDelete);
            productsBasketContain.append(basketItem);
        });
    }
}
