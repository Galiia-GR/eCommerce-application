import { helpCreateEl } from './global';

export function funcHamburger() {
    const iconHamb = helpCreateEl('div', 'hamburger') as HTMLElement;
    const lineHamb = helpCreateEl('span', 'hamburger__line') as HTMLElement;
    const headerContainer = document.querySelector('.header-container');
    const navContainer = document.querySelector('.navigation-cotainer') as HTMLElement;
    const bodyTag = document.querySelector('body') as HTMLElement;
    const navMenuLinks = document.querySelectorAll('.navigation-link');
    headerContainer?.append(iconHamb);
    iconHamb.append(lineHamb);
    let hamburgerOpen = false;

    iconHamb.addEventListener('click', () => {
        iconHamb.classList.toggle('active-icon');
        navContainer.classList.toggle('header__navigation_active');
        bodyTag.classList.toggle('modal-open');
        hamburgerOpen = true;
    });

    if (window.innerWidth <= 767) {
        for (let i = 0; i < navMenuLinks.length; i++) {
            navMenuLinks[i].addEventListener('click', () => {
                navContainer.classList.toggle('header__navigation_active');
                bodyTag.classList.toggle('modal-open');
                iconHamb.classList.toggle('active-icon');
                closeHamburger();
            });
        }
    }

    function closeHamburger() {
        hamburgerOpen = false;
    }

    window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            if (hamburgerOpen) {
                navContainer.classList.toggle('header__navigation_active');
                bodyTag.classList.toggle('modal-open');
                iconHamb.classList.toggle('active-icon');
                hamburgerOpen = false;
            }
        }
    });

    window.addEventListener('resize', () => {
        if (hamburgerOpen) {
            navContainer.classList.toggle('header__navigation_active');
            bodyTag.classList.toggle('modal-open');
            iconHamb.classList.toggle('active-icon');
            hamburgerOpen = false;
        }
    });

    window.addEventListener('click', (e) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement) {
            if (
                !targetElement.classList.contains('navigation') &&
                !targetElement.classList.contains('hamburger') &&
                navContainer.classList.contains('header__navigation_active')
            ) {
                navContainer.classList.toggle('header__navigation_active');
                bodyTag.classList.toggle('modal-open');
                iconHamb.classList.toggle('active-icon');
                hamburgerOpen = false;
            }
        }
    });
}

funcHamburger();
