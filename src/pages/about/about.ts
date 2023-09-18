import { helpCreateEl } from '../global/global';

export function createAboutUsPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionAbout = helpCreateEl('section', 'about');
    const sectionAboutContainer = helpCreateEl('div', 'about-container');
    mainTag.append(sectionAbout);
    sectionAbout.append(sectionAboutContainer);
    sectionAboutContainer.innerText = 'hello please hold on we are doing this section';
    sectionAboutContainer.style.color = 'red';
}
