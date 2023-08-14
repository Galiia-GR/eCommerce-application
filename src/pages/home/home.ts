import { helpCreateEl, createHeader, createFooret } from '../global/global';
import greenBgImg from '../../assets/images/home/greenBgImg.jpg';
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

export function createHome() {
    const bodyContainer = document.querySelector('.body-container');
    const mainContainer = helpCreateEl('div', 'main-container');
    const mainTag = helpCreateEl('main', 'main');
    const mainTitle = helpCreateEl('h1', 'main-title');

    bodyContainer?.append(mainTag);
    mainTag.append(mainContainer);
    mainContainer?.append(mainTitle);

    mainTitle.textContent = 'What is your favorite cat?';

    const homeCatsContainer = helpCreateEl('div', 'home-cats-container');
    mainContainer?.appendChild(homeCatsContainer);

    mainTag.style.background = `URL('${greenBgImg}') center/cover, rgba(0, 0, 0, 0.2)`;
    const arrHomeCats = [
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
    ];

    for (let i = 0; i < arrHomeCats.length; i += 1) {
        const container = helpCreateEl('div', 'home-cat__container');
        const item = helpCreateEl('div', 'home-cat__item');
        const itemEmpty = helpCreateEl('div', 'home-cat__empty');
        const img = helpCreateEl('img', 'home-cat__img') as HTMLImageElement;
        const title = helpCreateEl('h3', 'home-cat__title');
        homeCatsContainer.append(container);
        homeCatsContainer.appendChild(itemEmpty);
        container.append(item);
        item.append(img);
        container.appendChild(title);

        title.textContent = `arrHomeCats${i}`;
        img.src = arrHomeCats[i];
        item.setAttribute('id', `${i}`);
    }
}

createHeader();
createHome();
createFooret();
