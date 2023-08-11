import footprintImg from '../../assets/images/footprintImg.png';

export function helpCreateEl(tagName: string, className: string) {
    const el = document.createElement(tagName);
    if (className) {
        el.className = className;
    }
    return el;
}

export function createHeader() {
    const bodyTag = document.querySelector('body');
    const headerTag = helpCreateEl('header', 'header');

    const bodyContainer = helpCreateEl('div', 'body-container');
    bodyTag?.append(bodyContainer);

    const headerContainer = helpCreateEl('div', 'header-container');
    bodyContainer?.append(headerTag);
    headerTag.append(headerContainer);

    const headerLogoLangBlock = helpCreateEl('div', 'logo-lang-container');
    headerContainer.append(headerLogoLangBlock);
    const logo = helpCreateEl('a', 'logo_link');
    logo.setAttribute('href', 'index.html');
    const logoImg = helpCreateEl('img', 'logo_img') as HTMLImageElement;
    headerLogoLangBlock.append(logo);
    logoImg.setAttribute('alt', 'logo');
    logoImg.src = footprintImg;
    logo.append(logoImg);
    const logoLang = helpCreateEl('div', 'logo-lang_switch');
    headerLogoLangBlock.append(logoLang);
    logoLang.textContent = 'SWITCH LANG';

    const navContainer = helpCreateEl('nav', 'navigation-cotainer');
    headerContainer.append(navContainer);

    const navigation = helpCreateEl('ul', 'navigation');
    navContainer.append(navigation);
    const arrNav = ['SHOP', 'SPIPPING', 'ABOUT US', 'CONTACTS', 'LOG IN', 'REGISTER'];

    for (let i = 0; i < arrNav.length; i += 1) {
        const item = helpCreateEl('li', 'navigation-item');
        const link = helpCreateEl('a', 'navigation__link');
        navContainer.appendChild(item);
        link.textContent = arrNav[i];
        link.setAttribute('href', `'./index.html#${arrNav[i]}`);
        item.append(link);
    }
}

export function createFooret() {
    const bodyContainer = document.querySelector('.body-container');
    const footerTag = helpCreateEl('footer', 'footer');
    const footerContainer = helpCreateEl('div', 'footer-container');
    bodyContainer?.append(footerTag);
    footerTag.append(footerContainer);
}
