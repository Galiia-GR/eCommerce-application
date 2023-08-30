import { helpCreateEl } from '../global/global';
import { getProfileInf } from './getInfProfile';

export async function createProfilePage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionProfile = helpCreateEl('section', 'profile');
    mainTag.append(sectionProfile);

    let info = getProfileInf();
    let avatar = helpCreateEl('div', 'profile-avatar');
    let name = helpCreateEl('h2', 'profile-name');
    let birth = helpCreateEl('div', 'profile-birth');
    let email = helpCreateEl('div', 'profile-email');
    let shippingContainer = helpCreateEl('div', 'profile-container');
    let shippingTitle = helpCreateEl('h4', 'profile-title');
    let shippingCity = helpCreateEl('div', '');
    let shippingCountry = helpCreateEl('div', '');
    let shippingStreet = helpCreateEl('div', '');
    let shippingPostal = helpCreateEl('div', '');
    let billingContainer = helpCreateEl('div', 'profile-container');
    let billingTitle = helpCreateEl('h4', 'profile-title');
    let billingCity = helpCreateEl('div', '');
    let billingCountry = helpCreateEl('div', '');
    let billingStreet = helpCreateEl('div', '');
    let billingPostal = helpCreateEl('div', '');
    let adressContainer = helpCreateEl('div', 'profile-adress');
    let editButton = helpCreateEl('button', 'profile-button');
    let passwordButton = helpCreateEl('button', 'profile-button');

    shippingTitle.textContent = 'Shipping adress';
    shippingCity.textContent = `City: ${(await info).addresses[0].city}`;
    shippingCountry.textContent = `Country: ${(await info).addresses[0].country}`;
    shippingStreet.textContent = `Street: ${(await info).addresses[0].streetName} ${
        (await info).addresses[0].streetNumber
    }`;
    shippingPostal.textContent = `Postal code: ${(await info).addresses[0].postalCode}`;
    billingTitle.textContent = 'BIlling adress';
    billingCity.textContent = `City: ${(await info).addresses[0].city}`;
    billingCountry.textContent = `Country: ${(await info).addresses[0].country}`;
    billingStreet.textContent = `Street: ${(await info).addresses[0].streetName} ${
        (await info).addresses[0].streetNumber
    }`;
    billingPostal.textContent = `Postal code: ${(await info).addresses[0].postalCode}`;
    editButton.textContent = 'Edit profile';
    passwordButton.textContent = 'Change password';
    birth.textContent = `Birth: ${(await info).dateOfBirth}`;
    email.textContent = `Email: ${(await info).email}`;
    name.textContent = `${(await info).firstName} ${(await info).lastName}`;
    shippingContainer.append(shippingTitle, shippingCountry, shippingPostal, shippingCity, shippingStreet);
    billingContainer.append(billingTitle, billingCountry, billingPostal, billingCity, billingStreet);
    adressContainer.append(shippingContainer, billingContainer);
    sectionProfile.append(avatar, name, email, birth, adressContainer, editButton, passwordButton);
}
