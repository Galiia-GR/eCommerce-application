import fishHome from '../../assets/images/fishHome.png';
import git from '../../assets/images/gitSvg.svg';
import rss from '../../assets/images/rss.svg';
import icoBasket from '../../assets/images/cartHome.png';

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

    const headerLogoLangBlock = helpCreateEl('div', 'logo-container');
    headerContainer.append(headerLogoLangBlock);
    const logo = helpCreateEl('a', 'logo_link');
    const logoImg = helpCreateEl('img', 'logo_img') as HTMLImageElement;
    headerLogoLangBlock.append(logo);
    logoImg.setAttribute('alt', 'logo');

    logoImg.src = fishHome;
    logo.append(logoImg);
    const logoLang = helpCreateEl('div', 'logo-userName');
    headerLogoLangBlock.append(logoLang);
    logoLang.textContent = 'Home';

    const navContainer = helpCreateEl('nav', 'navigation-cotainer');
    headerContainer.append(navContainer);

    const navigation = helpCreateEl('ul', 'navigation');
    navContainer.append(navigation);
    const arrNav = ['SHOP', 'ABOUT', 'LOGIN', 'REGISTER', 'PROFILE', 'BASKET'];

    for (let i = 0; i < arrNav.length; i += 1) {
        const item = helpCreateEl('li', 'navigation-item');
        item.classList.add(`${[arrNav[i]]}`);
        navigation.appendChild(item);
        item.textContent = arrNav[i];
    }
    const basket = document.querySelector('.BASKET') as HTMLElement;
    basket.textContent = '';
    const icoCart = helpCreateEl('img', 'basket-home-img BASKET') as HTMLImageElement;
    basket?.append(icoCart);
    icoCart.src = icoBasket;

    const mainTag = helpCreateEl('main', 'main');
    bodyContainer?.append(mainTag);
}

export function createFooter() {
    const bodyContainer = document.querySelector('.body-container');
    const footerTag = helpCreateEl('footer', 'footer');
    const footerContainer = helpCreateEl('div', 'footer-container');
    bodyContainer?.append(footerTag);
    footerTag.append(footerContainer);
    const temp = `
      <a class="RSS" href="https://rs.school/js/" target="_blank">
          <img src="${rss}" width="102" height="30" alt="RS School" />
      </a>
      <p>
          2023 by
          <a href="https://github.com/Galiia-GR" target="_blank">
              <img src="${git}" width="25" height="25" alt="github"
          /></a>
          <a href="https://github.com/vlad-shkv" target="_blank">
              <img src="${git}" width="25" height="25" alt="github"
          /></a>
          <a href="https://github.com/gregoryrubies" target="_blank">
              <img src="${git}" width="25" height="25" alt="github"
          /></a>
      </p>
    `;
    footerContainer.innerHTML = temp;
}
