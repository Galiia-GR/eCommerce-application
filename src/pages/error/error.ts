import { helpCreateEl } from '../global/global';

export function createError() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionError = helpCreateEl('section', 'error');
    const sectionErrorContainer = helpCreateEl('div', 'error-404');
    mainTag.append(sectionError);
    sectionError.append(sectionErrorContainer);
    sectionErrorContainer.innerText = '404: Error! The page not found.';
}
