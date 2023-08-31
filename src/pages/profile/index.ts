import { responseAdress } from 'src/interfaces';
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
    let errorTitle = helpCreateEl('h1', 'error-title');

    async function yourBilling(): Promise<responseAdress | undefined> {
        let curId = (await info).billingAddressIds[0];
        let adressessData: responseAdress[] = [...(await info).addresses];
        for (let i = 0; i < adressessData.length; i++) {
            if (adressessData[i].id === curId) {
                return adressessData[i];
            }
        }
        return undefined;
    }

    async function yourShipping(): Promise<responseAdress | undefined> {
        let curId = (await info).shippingAddressIds[0];
        let adressessData: responseAdress[] = [...(await info).addresses];
        for (let i = 0; i < adressessData.length; i++) {
            if (adressessData[i].id === curId) {
                return adressessData[i];
            }
        }
        return undefined;
    }

    try {
        let billingAdressObject: responseAdress | undefined = await yourBilling();
        console.log('billing');
        console.log(billingAdressObject);
        let shippingAdressObject: responseAdress | undefined = await yourShipping();
        console.log('shipping');
        console.log(shippingAdressObject);

        if (shippingAdressObject !== undefined) {
            shippingTitle.textContent = 'Shipping adress';
            shippingCity.textContent = `City: ${shippingAdressObject.city}`;
            shippingCountry.textContent = `Country: ${shippingAdressObject.country}`;
            shippingStreet.textContent = `Street: ${shippingAdressObject.streetName} ${shippingAdressObject.streetNumber}`;
            shippingPostal.textContent = `Postal code: ${shippingAdressObject.postalCode}`;
        }

        if (billingAdressObject !== undefined) {
            billingTitle.textContent = 'BIlling adress';
            billingCity.textContent = `City: ${billingAdressObject.city}`;
            billingCountry.textContent = `Country: ${billingAdressObject.country}`;
            billingStreet.textContent = `Street: ${billingAdressObject.streetName} ${billingAdressObject.streetNumber}`;
            billingPostal.textContent = `Postal code: ${billingAdressObject.postalCode}`;
        }

        editButton.textContent = 'Edit profile';
        passwordButton.textContent = 'Change password';
        birth.textContent = `Birth: ${(await info).dateOfBirth}`;
        email.textContent = `Email: ${(await info).email}`;
        name.textContent = `${(await info).firstName} ${(await info).lastName}`;
        shippingContainer.append(shippingTitle, shippingCountry, shippingPostal, shippingCity, shippingStreet);
        billingContainer.append(billingTitle, billingCountry, billingPostal, billingCity, billingStreet);
        adressContainer.append(shippingContainer, billingContainer);
        sectionProfile.append(avatar, name, email, birth, adressContainer, editButton, passwordButton);
    } catch {
        errorTitle.textContent = 'Please, sign in for load that page';
        sectionProfile.append(errorTitle);
    }
}
