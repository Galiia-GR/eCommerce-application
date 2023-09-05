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

            passwordInput.addEventListener('input', () => {
                let isCorrect = true;
                let haveUpper = false;
                let haveLover = false;
                let haveNumber = false;
                let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
                let numbers = '1234567890';

                sectionProfile.querySelectorAll('.error').forEach((spanEl) => {
                    spanEl.remove();
                });

                letters.split('').forEach((step) => {
                    if (passwordInput.value.includes(step)) {
                        haveUpper = true;
                    }
                    if (passwordInput.value.includes(step.toLowerCase())) {
                        haveLover = true;
                    }
                });
                numbers.split('').forEach((step) => {
                    if (passwordInput.value.includes(step)) {
                        haveNumber = true;
                    }
                });

                if (passwordInput.value.length < 8) {
                    isCorrect = false;
                    addError(passwordInput, '*Password must contain at least 8 characters');
                }
                if ((passwordInput.value.startsWith(' ') || passwordInput.value.endsWith(' ')) === true) {
                    isCorrect = false;
                    addError(passwordInput, '*Password must not contain leading or trailing whitespace');
                }
                if (haveLover === false) {
                    isCorrect = false;
                    addError(passwordInput, '*Password must contain at least 1 lowercase letter');
                }
                if (haveUpper === false) {
                    isCorrect = false;
                    addError(passwordInput, '*Password must contain at least 1 uppercase letter');
                }
                if (haveNumber === false) {
                    isCorrect = false;
                    addError(passwordInput, '*Password must contain at least 1 numder character');
                }

                if (password2Input.value !== passwordInput.value) {
                    addError(password2Input, '*Passwords must be same');
                }

                if (isCorrect === false) {
                    return;
                }
            });

            password2Input.addEventListener('input', () => {
                sectionProfile.querySelectorAll('.error').forEach((spanEl) => {
                    spanEl.remove();
                });
                if (password2Input.value !== passwordInput.value) {
                    addError(password2Input, '*Passwords must be same');
                }
            });

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

                shippingContainer.querySelectorAll('input').forEach((inp) => {
                    inp.addEventListener('input', () => {
                        let postalCorrect = false;
                        let onlyLettersCity = 1;
                        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';

                        sectionProfile.querySelectorAll('.error1').forEach((spanEl) => {
                            spanEl.remove();
                        });

                        inp.style.border = '';

                        shippingCity.value.split('').forEach((step) => {
                            if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                                onlyLettersCity = 0;
                            }
                        });

                        shippingContainer.querySelectorAll('input').forEach((err) => {
                            err.classList.remove('errorInput');
                        });

                        if (shippingStreet.value.length < 1) {
                            addError2(shippingStreet, '*Your street must contain at least 1 character');
                        }
                        if (
                            !(
                                shippingCountry.value === 'PL' ||
                                shippingCountry.value === 'US' ||
                                shippingCountry.value === 'IT' ||
                                shippingCountry.value === 'KZ' ||
                                shippingCountry.value === 'RU' ||
                                shippingCountry.value === 'DE'
                            )
                        ) {
                            addError2(shippingCountry, '*Your country must be valid: PL, US, IT, KZ, RU, DE');
                        }
                        if ((shippingStreet.value.startsWith(' ') || shippingStreet.value.endsWith(' ')) === true) {
                            addError2(shippingStreet, '*Street must not contain leading or trailing whitespace');
                        }
                        if (onlyLettersCity === 0) {
                            addError2(shippingCity, '*City must not contain numbers or special characters');
                        }
                        if (shippingCity.value.length < 1) {
                            addError2(shippingCity, '*Your city must contain at least 1 character');
                        }
                        if (
                            shippingCountry.value === 'PL' &&
                            shippingPostal.value[2] === '-' &&
                            shippingPostal.value.length === 6
                        ) {
                            postalCorrect = true;
                        }
                        if (
                            shippingCountry.value === 'US' &&
                            shippingPostal.value[5] === '-' &&
                            shippingPostal.value.length === 10
                        ) {
                            postalCorrect = true;
                        }
                        if (shippingCountry.value === 'IT' && shippingPostal.value.length === 5) {
                            postalCorrect = true;
                        }
                        if (shippingCountry.value === 'KZ' && shippingPostal.value.length === 7) {
                            postalCorrect = true;
                        }
                        if (shippingCountry.value === 'RU' && shippingPostal.value.length === 6) {
                            postalCorrect = true;
                        }
                        if (shippingCountry.value === 'DE' && shippingPostal.value.length === 5) {
                            postalCorrect = true;
                        }
                        if (postalCorrect === false) {
                            addError2(shippingPostal, "*Your country's postal code must be correct");
                        }
                    });
                });

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
                        try {
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
                        } catch {
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

                billingContainer.querySelectorAll('input').forEach((inp) => {
                    inp.addEventListener('input', () => {
                        let postalCorrect = false;
                        let onlyLettersCity = 1;
                        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';

                        sectionProfile.querySelectorAll('.error1').forEach((spanEl) => {
                            spanEl.remove();
                        });

                        inp.style.border = '';

                        billingCity.value.split('').forEach((step) => {
                            if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                                onlyLettersCity = 0;
                            }
                        });

                        billingContainer.querySelectorAll('input').forEach((err) => {
                            err.classList.remove('errorInput');
                        });

                        if (billingStreet.value.length < 1) {
                            addError2(billingStreet, '*Your street must contain at least 1 character');
                        }
                        if (
                            !(
                                billingCountry.value === 'PL' ||
                                billingCountry.value === 'US' ||
                                billingCountry.value === 'IT' ||
                                billingCountry.value === 'KZ' ||
                                billingCountry.value === 'RU' ||
                                billingCountry.value === 'DE'
                            )
                        ) {
                            addError2(billingCountry, '*Your country must be valid: PL, US, IT, KZ, RU, DE');
                        }
                        if ((billingStreet.value.startsWith(' ') || billingStreet.value.endsWith(' ')) === true) {
                            addError2(billingStreet, '*Street must not contain leading or trailing whitespace');
                        }
                        if (onlyLettersCity === 0) {
                            addError2(billingCity, '*City must not contain numbers or special characters');
                        }
                        if (billingCity.value.length < 1) {
                            addError2(billingCity, '*Your city must contain at least 1 character');
                        }
                        if (
                            billingCountry.value === 'PL' &&
                            billingPostal.value[2] === '-' &&
                            billingPostal.value.length === 6
                        ) {
                            postalCorrect = true;
                        }
                        if (
                            billingCountry.value === 'US' &&
                            billingPostal.value[5] === '-' &&
                            billingPostal.value.length === 10
                        ) {
                            postalCorrect = true;
                        }
                        if (billingCountry.value === 'IT' && billingPostal.value.length === 5) {
                            postalCorrect = true;
                        }
                        if (billingCountry.value === 'KZ' && billingPostal.value.length === 7) {
                            postalCorrect = true;
                        }
                        if (billingCountry.value === 'RU' && billingPostal.value.length === 6) {
                            postalCorrect = true;
                        }
                        if (billingCountry.value === 'DE' && billingPostal.value.length === 5) {
                            postalCorrect = true;
                        }
                        if (postalCorrect === false) {
                            addError2(billingPostal, "*Your country's postal code must be correct");
                        }
                    });
                });

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
                        try {
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
                        } catch {
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
                    el.classList.add('fullBorder');
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
                        }
                        if (email.value.includes('@') === false) {
                            isCorrect = false;
                            addError(
                                email,
                                '*Email address must contain an "@" symbol separating local part and domain name'
                            );
                        }
                        if (email.value.split('@')[email.value.split('@').length - 1].length < 5) {
                            isCorrect = false;
                            addError(email, '*Email address must contain domain name');
                        }

                        if (name.value.split(' ').length < 2 || name.value.split(' ').includes('')) {
                            isCorrect = false;
                            addError(name, '*Name must contain first name and last name with 1 character at least');
                        }
                        if (onlyLetters === 0) {
                            isCorrect = false;
                            addError(name, '*Name must not contain numbers or special characters');
                        }
                        if (Number(birth.value.split('-')[0]) > 2010 || birth.value.length === 0) {
                            isCorrect = false;
                            addError(birth, '*You must be over 13 years old');
                        }
                        if (Number(birth.value.split('-')[0]) === 2010) {
                            if (Number(birth.value.split('-')[2]) > 8) {
                                isCorrect = false;
                                addError(birth, '*You must be over 13 years old');
                            }
                        }

                        if (el.classList.contains('errorInput') || el.classList.contains('errorInput1')) {
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

function addError2(element: HTMLElement, error: string) {
    let errorMessage = document.createElement('span');
    errorMessage.classList.add('error1');
    errorMessage.textContent = error;
    element.after(errorMessage);
}
