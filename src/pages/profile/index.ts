import { responseAdress } from 'src/interfaces';
import { helpCreateEl } from '../global/global';
import { getProfileInf } from './getInfProfile';
import { addError } from '../register';
import { updatePassword } from './changePassword';
import { updateName } from './changeName';
import { updateAddress } from './changeAddress';
import { updateAddressBillingDef } from './changeDefBilling';
import { updateAddressShippingDef } from './changeDefShipping';

export async function createProfilePage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionProfile = helpCreateEl('section', 'profile');
    const sectionProfileContainer = helpCreateEl('section', 'profile-scroll');
    mainTag.append(sectionProfileContainer);
    sectionProfileContainer.append(sectionProfile);

    let info = getProfileInf();
    let avatar = helpCreateEl('div', 'profile-avatar');
    let name = helpCreateEl('input', 'profile-name') as HTMLInputElement;
    name.readOnly = true;
    let birth = helpCreateEl('input', 'profile-birth') as HTMLInputElement;
    birth.readOnly = true;
    let email = helpCreateEl('input', 'profile-email') as HTMLInputElement;
    email.readOnly = true;
    let editButton = helpCreateEl('button', 'profile-button');
    let passwordButton = helpCreateEl('button', 'profile-button');
    let errorTitle = helpCreateEl('h1', 'error-title');
    birth.type = 'date';

    passwordButton.addEventListener('click', () => {
        if (!document.querySelector('.profile-password')) {
            let passwordUpdateButton = helpCreateEl('button', 'profile-button');
            passwordButton.after(passwordUpdateButton);
            passwordUpdateButton.textContent = 'Update';

            let password2Input = helpCreateEl('input', 'profile-password') as HTMLInputElement;
            password2Input.placeholder = 'Type here';
            passwordButton.after(password2Input);
            addTitle(password2Input, 'New password:');

            let passwordInput = helpCreateEl('input', 'profile-password') as HTMLInputElement;
            passwordInput.placeholder = 'Type here';
            passwordButton.after(passwordInput);
            addTitle(passwordInput, 'Current password:');

            passwordUpdateButton.addEventListener('click', async () => {
                try {
                    await updatePassword((await info).id, passwordInput.value, password2Input.value);
                    await localStorage.setItem('version', String(Number(localStorage.getItem('version')) + 1));
                    await localStorage.clear();
                    await location.reload();
                } catch (err) {
                    sectionProfile.querySelectorAll('.error').forEach((spanEl) => {
                        spanEl.remove();
                    });
                    addError(passwordUpdateButton, 'Invalid information');
                }
            });
        }
    });

    async function yourBilling(): Promise<responseAdress[] | undefined> {
        let curIdArray = (await info).billingAddressIds;
        let adressessData: responseAdress[] = [...(await info).addresses];
        let resultArray = [];
        for (let j = 0; j < curIdArray.length; j++) {
            for (let i = 0; i < adressessData.length; i++) {
                if (adressessData[i].id === curIdArray[j]) {
                    resultArray.push(adressessData[i]);
                }
            }
        }
        return resultArray;
    }

    async function yourShipping(): Promise<responseAdress[] | undefined> {
        let curIdArray = (await info).shippingAddressIds;
        let adressessData: responseAdress[] = [...(await info).addresses];
        let resultArray = [];
        for (let j = 0; j < curIdArray.length; j++) {
            for (let i = 0; i < adressessData.length; i++) {
                if (adressessData[i].id === curIdArray[j]) {
                    resultArray.push(adressessData[i]);
                }
            }
        }
        return resultArray;
    }

    try {
        let billingAdressObjectArray: responseAdress[] | undefined = await yourBilling();
        let shippingAdressObjectArray: responseAdress[] | undefined = await yourShipping();

        editButton.textContent = 'Edit profile';
        passwordButton.textContent = 'Change password';
        birth.value = `${(await info).dateOfBirth}`;
        email.value = `${(await info).email}`;
        name.value = `${(await info).firstName} ${(await info).lastName}`;
        sectionProfile.append(avatar, name, email, birth, passwordButton);
        addTitle(name, 'Name:');
        addTitle(email, 'Email:');
        addTitle(birth, 'Birth:');
        let inputsArr = [name, birth, email];

        if (shippingAdressObjectArray !== undefined) {
            let cur = 0;
            shippingAdressObjectArray.forEach(async (el) => {
                cur += 1;
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
                shippingContainer.append(shippingTitle, shippingCountry, shippingPostal, shippingCity, shippingStreet);
                sectionProfile.append(shippingContainer);
                if ((await info).defaultShippingAddressId === el.id) {
                    let defTitle = helpCreateEl('h5', 'profile-title');
                    defTitle.textContent = '*Current default shipping address*';
                    defTitle.style.marginTop = '20px';
                    shippingContainer.append(defTitle);
                } else {
                    let defButton = helpCreateEl('button', 'profile-button');
                    defButton.textContent = 'Set as default shipping address';
                    defButton.addEventListener('click', async () => {
                        await updateAddressShippingDef((await info).id, el.id);
                        await shippingContainer.removeChild(defButton);
                        let defTitle = await helpCreateEl('h5', 'profile-title');
                        defTitle.textContent = await '*Current default shipping address*';
                        defTitle.style.marginTop = await '20px';
                        await shippingContainer.append(defTitle);
                    });
                    shippingContainer.append(defButton);
                }

                shippingTitle.textContent = `Shipping address ${cur}`;
                shippingCity.value = `${el.city}`;
                shippingCountry.value = `${el.country}`;
                shippingStreet.value = `${el.streetName} ${el.streetNumber}`;
                shippingPostal.value = `${el.postalCode}`;

                inputsArr.push(shippingCity);
                inputsArr.push(shippingCountry);
                inputsArr.push(shippingStreet);
                inputsArr.push(shippingPostal);

                addTitle(shippingCity, 'City:');
                addTitle(shippingCountry, 'Country:');
                addTitle(shippingStreet, 'Street:');
                addTitle(shippingPostal, 'Postal:');

                await editButton.addEventListener('click', async () => {
                    if (shippingCity.readOnly === true) {
                        await updateAddress(
                            (
                                await info
                            ).id,
                            el.id,
                            shippingStreet.value.split('')[0],
                            shippingStreet.value.split('')[1],
                            shippingPostal.value,
                            shippingCity.value,
                            shippingCountry.value
                        );
                    }
                });
            });
        }

        let addShippingButton = helpCreateEl('button', 'profile-button');
        addShippingButton.textContent = 'Add shipping address';
        addShippingButton.style.marginTop = '10px';
        sectionProfile.append(addShippingButton);

        if (billingAdressObjectArray !== undefined) {
            let cur = 0;
            billingAdressObjectArray.forEach(async (el) => {
                cur += 1;
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

                billingContainer.append(billingTitle, billingCountry, billingPostal, billingCity, billingStreet);
                sectionProfile.append(billingContainer);

                if ((await info).defaultBillingAddressId === el.id) {
                    let defTitle = helpCreateEl('h5', 'profile-title');
                    defTitle.textContent = '*Current default billing address*';
                    defTitle.style.marginTop = '20px';
                    billingContainer.append(defTitle);
                } else {
                    let defButton = helpCreateEl('button', 'profile-button');
                    defButton.textContent = 'Set as default billing address';
                    defButton.addEventListener('click', async () => {
                        await updateAddressBillingDef((await info).id, el.id);
                        await billingContainer.removeChild(defButton);

                        let defTitle = await helpCreateEl('h5', 'profile-title');
                        defTitle.textContent = await '*Current default billing address*';
                        defTitle.style.marginTop = await '20px';
                        await billingContainer.append(defTitle);
                    });
                    billingContainer.append(defButton);
                }

                billingTitle.textContent = `BIlling address ${cur}`;
                billingCity.value = `${el.city}`;
                billingCountry.value = `${el.country}`;
                billingStreet.value = `${el.streetName} ${el.streetNumber}`;
                billingPostal.value = `${el.postalCode}`;

                inputsArr.push(billingCity);
                inputsArr.push(billingCountry);
                inputsArr.push(billingStreet);
                inputsArr.push(billingPostal);

                addTitle(billingCity, 'City:');
                addTitle(billingCountry, 'Country:');
                addTitle(billingStreet, 'Street:');
                addTitle(billingPostal, 'Postal:');

                await editButton.addEventListener('click', async () => {
                    if (billingCity.readOnly === true) {
                        await updateAddress(
                            (
                                await info
                            ).id,
                            el.id,
                            billingStreet.value.split('')[0],
                            billingStreet.value.split('')[1],
                            billingPostal.value,
                            billingCity.value,
                            billingCountry.value
                        );
                    }
                });
            });
        }

        let addBillingButton = helpCreateEl('button', 'profile-button');
        addBillingButton.textContent = 'Add billing address';
        sectionProfile.append(addBillingButton);

        sectionProfile.append(editButton);

        let currStage = 1;
        await editButton.addEventListener('click', async () => {
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
                await updateName((await info).id, name.value, email.value, birth.value);
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
