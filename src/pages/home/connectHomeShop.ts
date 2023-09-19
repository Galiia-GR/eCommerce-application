import { allProductList } from '../shop/getProducts';

const cardOpenBackground = document.querySelector('.card-fish__background');

document.addEventListener('click', (event) => {
    const el = event.target as HTMLElement;
    const parentEl = el.closest('.home-fish__item');
    if (parentEl?.classList.contains('home-fish__item')) {
        const getId = parentEl.getAttribute('id');
        allProductList.forEach((data) => {
            if (data[0].name.en === getId) {
                const getUrl = data[0].slug.en;
                window.location.hash = `/shop/${getUrl}`;
            }
        });
    }
});

const mainContainer = document.querySelector('.main-container') as HTMLElement;

document.addEventListener('click', () => {
    if (mainContainer && cardOpenBackground) {
        window.location.hash = `/`;
        console.log("I'm here");
    }
});
