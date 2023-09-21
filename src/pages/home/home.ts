import { helpCreateEl, createHeader, createFooter } from '../global/global';
import greenBgImg from '../../assets/images/home/bg1.jpg';
import img1 from '../../assets/images/home/img1.png';
import img2 from '../../assets/images/home/img2.png';
import img3 from '../../assets/images/home/img3.png';
import img4 from '../../assets/images/home/img4.png';
import img5 from '../../assets/images/home/img5.png';
import img6 from '../../assets/images/home/img6.png';
import img7 from '../../assets/images/home/img7.png';
import img8 from '../../assets/images/home/img8.png';
import img9 from '../../assets/images/home/img9.png';
import img10 from '../../assets/images/home/img10.png';
import img11 from '../../assets/images/home/img11.png';
import img12 from '../../assets/images/home/img12.png';
import img13 from '../../assets/images/home/img13.png';
import img14 from '../../assets/images/home/img14.png';
import img15 from '../../assets/images/home/img15.png';
import img16 from '../../assets/images/home/img16.png';
import img17 from '../../assets/images/home/img17.png';
import img18 from '../../assets/images/home/img18.png';

export function createMain() {
    const mainTag = document.querySelector('main') as HTMLElement;
    const mainContainer = helpCreateEl('div', 'main-container');
    const mainTitle = helpCreateEl('h1', 'main-title');

    mainTag.append(mainContainer);
    mainContainer?.append(mainTitle);

    mainTitle.textContent = 'MARINE FISH';

    const homeFishContainer = helpCreateEl('div', 'home-fish-container');
    mainContainer?.appendChild(homeFishContainer);

    mainTag.style.background = `URL('${greenBgImg}') center/cover, rgba(0, 0, 0, 0.2)`;
    const arrHomeFish = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18,
    ];

    const arrHomeFishNames = [
        'Copperband butterfly',
        'Royal angelfish',
        'Palete surgeonfish',
        'Mandarinfish clownfish',
        'Lined surgeonfish',
        'Purple tang surgeonfish',
        'Freshwater angelfish',
        'Ocellaris clownfish',
        "Clark's anemonefish",
        'Clarion angelfish',
        'Orangespine unicornfish',
        'Golden angelfish',
        'Scribbled angelfish',
        'Clown loach',
        'Threadfin butterflyfish',
        'Clown triggerfish',
        'Emperor angelfish juvenile',
        'Emperor angelfish adult',
    ];

    for (let i = 0; i < arrHomeFish.length; i += 1) {
        const container = helpCreateEl('div', 'home-fish__container');
        const item = helpCreateEl('div', 'home-fish__item');
        const itemEmpty = helpCreateEl('div', 'home-fish__empty');
        const img = helpCreateEl('img', 'home-fish__img') as HTMLImageElement;
        const title = helpCreateEl('h3', 'home-fish__title');
        homeFishContainer.append(container);
        homeFishContainer.appendChild(itemEmpty);
        container.append(item);
        item.append(img);
        container.appendChild(title);

        title.textContent = `${arrHomeFishNames[i]}`;
        img.src = arrHomeFish[i];
        item.setAttribute('id', `${arrHomeFishNames[i]}`);
    }

    const buble = helpCreateEl('div', 'buble');
    mainContainer.appendChild(buble);
    buble.innerHTML = `<div class="bublcontent">
    </div>
    <div class="bubl1"></div>
    <div class="bubl2"></div>
    <div class="bubl3"></div>
</div>`;

    mainContainer.appendChild(buble);
}

export function createHomePage() {
    createHeader();
    createMain();
    createFooter();
}

createHomePage();
