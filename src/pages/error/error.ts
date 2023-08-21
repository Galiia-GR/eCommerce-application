import { helpCreateEl } from '../global/global';
import foot1 from '../../assets/images/404_1.png';

export function createError() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionError = helpCreateEl('section', 'error-404-container');

    const headerError = helpCreateEl('h2', 'title-404');
    const footsImgContainer = helpCreateEl('div', 'foots-404-container');

    const footImg = helpCreateEl('img', 'img__404') as HTMLImageElement;
    footsImgContainer.append(footImg);
    footImg.src = foot1;

    mainTag.append(sectionError);
    sectionError.append(headerError);
    sectionError.append(footsImgContainer);
    headerError.innerText = 'Oops! 404: Error! Page not found...';
}
