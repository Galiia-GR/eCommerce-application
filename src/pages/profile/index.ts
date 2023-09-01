import { responseAdress } from 'src/interfaces';
import { helpCreateEl } from '../global/global';
import { getProfileInf } from './getInfProfile';
import { addError } from '../register';

export async function createProfilePage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionProfile = helpCreateEl('section', 'profile');
    mainTag.append(sectionProfile);

    let info = getProfileInf();
    let avatar = helpCreateEl('div', 'profile-avatar');
    let name = helpCreateEl('input', 'profile-name') as HTMLInputElement;
    name.readOnly = true;
    let birth = helpCreateEl('input', 'profile-birth') as HTMLInputElement;
    birth.readOnly = true;
    let email = helpCreateEl('input', 'profile-email') as HTMLInputElement;
    email.readOnly = true;
    let shippingContainer = helpCreateEl('div', 'profile-container');
    let shippingTitle = helpCreateEl('h4', 'profile-title');
    let shippingCity = helpCreateEl('input', '') as HTMLInputElement;
    shippingCity.readOnly = true;
    let shippingCountry = helpCreateEl('input', '') as HTMLInputElement;
    shippingCountry.readOnly = true;
    let shippingStreet = helpCreateEl('input', '') as HTMLInputElement;
    shippingStreet.readOnly = true;
    let shippingPostal = helpCreateEl('input', '') as HTMLInputElement;
    shippingPostal.readOnly = true;
    let billingContainer = helpCreateEl('div', 'profile-container');
    let billingTitle = helpCreateEl('h4', 'profile-title');
    let billingCity = helpCreateEl('input', '') as HTMLInputElement;
    billingCity.readOnly = true;
    let billingCountry = helpCreateEl('input', '') as HTMLInputElement;
    billingCountry.readOnly = true;
    let billingStreet = helpCreateEl('input', '') as HTMLInputElement;
    billingStreet.readOnly = true;
    let billingPostal = helpCreateEl('input', '') as HTMLInputElement;
    billingPostal.readOnly = true;
    let adressContainer = helpCreateEl('div', 'profile-adress');
    let editButton = helpCreateEl('button', 'profile-button');
    let passwordButton = helpCreateEl('button', 'profile-button');
    let errorTitle = helpCreateEl('h1', 'error-title');
    birth.type = 'date';

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
        let shippingAdressObject: responseAdress | undefined = await yourShipping();

        if (shippingAdressObject !== undefined) {
            shippingTitle.textContent = 'Shipping adress';
            shippingCity.value = `${shippingAdressObject.city}`;
            shippingCountry.value = `${shippingAdressObject.country}`;
            shippingStreet.value = `${shippingAdressObject.streetName} ${shippingAdressObject.streetNumber}`;
            shippingPostal.value = `${shippingAdressObject.postalCode}`;
        }

        if (billingAdressObject !== undefined) {
            billingTitle.textContent = 'BIlling adress';
            billingCity.value = `${billingAdressObject.city}`;
            billingCountry.value = `${billingAdressObject.country}`;
            billingStreet.value = `${billingAdressObject.streetName} ${billingAdressObject.streetNumber}`;
            billingPostal.value = `${billingAdressObject.postalCode}`;
        }

        editButton.textContent = 'Edit profile';
        passwordButton.textContent = 'Change password';
        birth.value = `${(await info).dateOfBirth}`;
        email.value = `${(await info).email}`;
        name.value = `${(await info).firstName} ${(await info).lastName}`;
        shippingContainer.append(shippingTitle, shippingCountry, shippingPostal, shippingCity, shippingStreet);
        billingContainer.append(billingTitle, billingCountry, billingPostal, billingCity, billingStreet);
        adressContainer.append(shippingContainer, billingContainer);
        sectionProfile.append(avatar, name, email, birth, adressContainer, editButton, passwordButton);
        addTitle(name, 'Name:');
        addTitle(email, 'Email:');
        addTitle(birth, 'Birth:');
        addTitle(billingCity, 'City:');
        addTitle(billingCountry, 'Country:');
        addTitle(billingStreet, 'Street:');
        addTitle(billingPostal, 'Postal:');
        addTitle(shippingCity, 'City:');
        addTitle(shippingCountry, 'Country:');
        addTitle(shippingStreet, 'Street:');
        addTitle(shippingPostal, 'Postal:');
        let inputsArr = [
            name,
            birth,
            email,
            shippingCity,
            shippingCountry,
            shippingStreet,
            shippingPostal,
            billingCity,
            billingCountry,
            billingStreet,
            billingPostal,
        ];

        let currStage = 1;
        editButton.addEventListener('click', () => {
            if (currStage === 1) {
                currStage += 1;
                editButton.textContent = 'Update';
                inputsArr.forEach((el) => {
                    el.readOnly = false;
                    el.style.border = 'solid 2px rgba(59, 134, 182, 0.9)';
                });
                inputsArr.forEach((el) => {
                    el.addEventListener('input', () => {
                        let isCorrect = true;
                        let onlyLetters = 1;
                        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ ';

                        sectionProfile.querySelectorAll('.error').forEach((spanEl) => {
                            spanEl.remove();
                        });

                        el.style.border = 'solid 2px rgba(59, 134, 182, 0.9)';
                        el.classList.remove('errorInput');

                        name.value.split('').forEach((step) => {
                            if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                                onlyLetters = 0;
                            }
                        });

                        if ((email.value.startsWith(' ') || email.value.endsWith(' ')) === true) {
                            isCorrect = false;
                            addError(email, '*Email address must not contain leading or trailing whitespace');
                            email.classList.add('errorInput');
                        }
                        if (email.value.includes('@') === false) {
                            isCorrect = false;
                            addError(
                                email,
                                '*Email address must contain an "@" symbol separating local part and domain name'
                            );
                            email.classList.add('errorInput');
                        }
                        if (email.value.split('@')[email.value.split('@').length - 1].length < 5) {
                            isCorrect = false;
                            addError(email, '*Email address must contain domain name');
                            email.classList.add('errorInput');
                        }

                        if (name.value.split(' ').length < 2 || name.value.split(' ').includes('')) {
                            isCorrect = false;
                            addError(name, '*Name must contain first name and last name with 1 character at least');
                            name.classList.add('errorInput');
                        }
                        if (onlyLetters === 0) {
                            isCorrect = false;
                            addError(name, '*Name must not contain numbers or special characters');
                            name.classList.add('errorInput');
                        }
                        if (Number(birth.value.split('-')[0]) > 2010 || birth.value.length === 0) {
                            isCorrect = false;
                            addError(birth, '*You must be over 13 years old');
                            birth.classList.add('errorInput');
                        }
                        if (Number(birth.value.split('-')[0]) === 2010) {
                            if (Number(birth.value.split('-')[2]) > 8) {
                                isCorrect = false;
                                addError(birth, '*You must be over 13 years old');
                                birth.classList.add('errorInput');
                            }
                        }

                        if (el.classList.contains('errorInput')) {
                            el.style.border = '2px solid rgba(255, 72, 72, 0.7)';
                        }

                        if (isCorrect === false) {
                            return;
                        }
                    });
                });
            } else if (currStage === 2) {
                currStage -= 1;
                editButton.textContent = 'Edit profile';
                inputsArr.forEach((el) => {
                    el.readOnly = true;
                    el.style.border = '';
                });
            }
        });
    } catch {
        errorTitle.textContent = 'Please, sign in for load that page';
        sectionProfile.append(errorTitle);
    }
}

function addTitle(element: HTMLElement, titleSpan: string) {
    let spanName = document.createElement('span');
    spanName.classList.add('input-title');
    spanName.textContent = titleSpan;
    element.before(spanName);
}
