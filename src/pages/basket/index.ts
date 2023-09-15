import { helpCreateEl } from '../global/global';
import { createBasket } from './createBasket';

export async function createBasketPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionBasket = helpCreateEl('section', 'basket');
    const sectionBasketContainer = helpCreateEl('section', 'basket-scroll');
    mainTag.append(sectionBasketContainer);
    sectionBasketContainer.append(sectionBasket);

    await createBasket();
}
