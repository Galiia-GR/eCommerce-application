import { helpCreateEl } from '../global/global';

export function createContactsPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionContacts = helpCreateEl('section', 'contacts');
    const sectionContactsContainer = helpCreateEl('div', 'contacts-container');
    mainTag.append(sectionContacts);
    sectionContacts.append(sectionContactsContainer);
    sectionContactsContainer.innerText = 'Not completed yet CONTACTS';
}
