import { countryObject, responseData } from 'src/interfaces';
import { postCustomer } from './createCustomer';
import { updateCustomer } from './updateCustomer';
import { openWindow, closeWindow, showPassword, loginBack } from '../login';
import { helpCreateEl } from '../global/global';

export function createRegisterWindow(): void {
    const mainPage = document.querySelector('.body-container') as HTMLElement;
    const registerBack = helpCreateEl('div', 'account-background') as HTMLElement;
    const registerWindow = helpCreateEl('div', 'account-window') as HTMLElement;
    const registerHeader = helpCreateEl('div', 'account-window__header') as HTMLElement;
    const emailInput = document.createElement('input') as HTMLInputElement;
    const passwordInput = document.createElement('input') as HTMLInputElement;
    const password2Input = document.createElement('input') as HTMLInputElement;
    const nameContainer = helpCreateEl('div', 'double-container') as HTMLElement;
    const nameLabel = document.createElement('h4') as HTMLElement;
    const firstNameInput = document.createElement('input') as HTMLInputElement;
    const secondNameInput = document.createElement('input') as HTMLInputElement;
    const registerButton = document.createElement('button') as HTMLButtonElement;
    const registerLabel = document.createElement('h2') as HTMLElement;
    const emailLabel = document.createElement('h4') as HTMLElement;
    const dateLabel = document.createElement('h4') as HTMLElement;
    const dateInput = document.createElement('input') as HTMLInputElement;
    const streetLabel = document.createElement('h4') as HTMLElement;
    const streetInput = document.createElement('input') as HTMLInputElement;
    const cityLabel = document.createElement('h4') as HTMLElement;
    const cityInput = document.createElement('input') as HTMLInputElement;
    const postalLabel = document.createElement('h4') as HTMLElement;
    const postalInput = document.createElement('input') as HTMLInputElement;
    const countryLabel = document.createElement('h4') as HTMLElement;
    const countryInput = document.createElement('select') as HTMLSelectElement;
    dateInput.style.padding = '24px';
    const passwordLabel = document.createElement('h4') as HTMLElement;
    const password2Label = document.createElement('h4') as HTMLElement;
    const passwordCheckbox = helpCreateEl('input', 'account-window__checkbox') as HTMLInputElement;
    const passwordCheckbox2 = helpCreateEl('input', 'account-window__checkbox') as HTMLInputElement;
    const singInLink = helpCreateEl('h5', 'sign-link') as HTMLElement;
    const registerExit = helpCreateEl('div', 'account-window__exit') as HTMLElement;
    const registerOpen = document.querySelector('.navigation-item:nth-child(7)') as HTMLElement;

    passwordCheckbox.type = 'checkbox';
    passwordCheckbox2.type = 'checkbox';
    passwordInput.type = 'password';
    password2Input.type = 'password';
    dateInput.type = 'date';

    emailInput.placeholder = 'Type here';
    passwordInput.placeholder = 'Type here';
    firstNameInput.placeholder = 'First name';
    secondNameInput.placeholder = 'Last name';
    password2Input.placeholder = 'Type here';
    streetInput.placeholder = 'Type here';
    cityInput.placeholder = 'Type here';
    postalInput.placeholder = 'Type here';

    registerButton.textContent = 'Sign up';
    registerLabel.textContent = 'Register';
    emailLabel.textContent = 'Write your email:';
    passwordLabel.textContent = 'Create your password:';
    password2Label.textContent = 'Confirm your password:';
    singInLink.textContent = 'Already have an account? Login Here';
    registerExit.textContent = '×';
    registerOpen.innerHTML = 'REGISTER';
    registerOpen.style.cursor = 'pointer';
    nameLabel.textContent = 'Type your name:';
    dateLabel.textContent = 'Choose your birthday:';
    streetLabel.textContent = 'Type your street:';
    cityLabel.textContent = 'Type your city:';
    postalLabel.textContent = 'Type your postal code:';
    countryLabel.textContent = 'Choose your country:';

    registerHeader.append(registerExit);
    nameContainer.append(firstNameInput, secondNameInput);
    registerWindow.append(
        registerHeader,
        registerLabel,
        nameLabel,
        nameContainer,
        dateLabel,
        dateInput,
        streetLabel,
        streetInput,
        cityLabel,
        cityInput,
        countryLabel,
        countryInput,
        postalLabel,
        postalInput,
        emailLabel,
        emailInput,
        passwordLabel,
        passwordInput,
        passwordCheckbox,
        password2Label,
        password2Input,
        passwordCheckbox2,
        registerButton,
        singInLink
    );
    registerBack.append(registerWindow);
    registerOpen.addEventListener('click', () => {
        openWindow(registerBack, mainPage);
    });
    registerExit.addEventListener('click', () => {
        closeWindow(registerBack, mainPage);
    });
    registerBack.addEventListener('click', (target) => {
        if (target.target === registerBack) {
            closeWindow(registerBack, mainPage);
        }
    });

    showPassword(passwordInput, passwordCheckbox);
    showPassword(password2Input, passwordCheckbox2);
    addCountry(countryInput);

    registerButton.addEventListener('click', async () => {
        try {
            let isCorrect = true;
            let haveUpper = false;
            let haveLover = false;
            let haveNumber = false;
            let postalCorrect = false;
            let onlyLetters = 1;
            let onlyLetters2 = 1;
            let onlyLettersCity = 1;
            let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
            let numbers = '1234567890';

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
            firstNameInput.value.split('').forEach((step) => {
                if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                    onlyLetters = 0;
                }
            });
            secondNameInput.value.split('').forEach((step) => {
                if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                    onlyLetters2 = 0;
                }
            });
            cityInput.value.split('').forEach((step) => {
                if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                    onlyLettersCity = 0;
                }
            });

            registerWindow.querySelectorAll('span').forEach((el) => {
                el.remove();
            });
            registerWindow.querySelectorAll('input').forEach((el) => {
                el.classList.remove('errorInput');
            });

            if ((emailInput.value.startsWith(' ') || emailInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(emailLabel, '*Email address must not contain leading or trailing whitespace');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.endsWith('.com') === false) {
                isCorrect = false;
                addError(emailLabel, '*Email must end with .com');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.includes('@') === false) {
                isCorrect = false;
                addError(emailLabel, '*Email address must contain an "@" symbol separating local part and domain name');
                emailInput.classList.add('errorInput');
            }

            if (passwordInput.value.length < 8) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 8 characters');
                passwordInput.classList.add('errorInput');
            }
            if ((passwordInput.value.startsWith(' ') || passwordInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(passwordLabel, '*Password must not contain leading or trailing whitespace');
                passwordInput.classList.add('errorInput');
            }
            if (haveLover === false) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 1 lowercase letter');
                passwordInput.classList.add('errorInput');
            }
            if (haveUpper === false) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 1 uppercase letter');
                passwordInput.classList.add('errorInput');
            }
            if (haveNumber === false) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 1 numder character');
                passwordInput.classList.add('errorInput');
            }
            if (firstNameInput.value.length < 1) {
                isCorrect = false;
                addError(nameLabel, '*First name must contain at least 1 character');
                firstNameInput.classList.add('errorInput');
            }
            if (secondNameInput.value.length < 1) {
                isCorrect = false;
                addError(nameLabel, '*Second name must contain at least 1 character');
                secondNameInput.classList.add('errorInput');
            }
            if (onlyLetters === 0) {
                isCorrect = false;
                addError(nameLabel, '*Name must not contain numbers or special characters');
                firstNameInput.classList.add('errorInput');
            }
            if (onlyLetters2 === 0) {
                isCorrect = false;
                addError(nameLabel, '*Name must not contain numbers or special characters');
                secondNameInput.classList.add('errorInput');
            }
            if (Number(dateInput.value.split('-')[0]) > 2010 || dateInput.value.length === 0) {
                isCorrect = false;
                addError(dateLabel, '*You must be over 13 years old');
                dateInput.classList.add('errorInput');
            }
            if (streetInput.value.length < 1) {
                isCorrect = false;
                addError(streetLabel, '*Your street must contain at least 1 character');
                streetInput.classList.add('errorInput');
            }
            if ((streetInput.value.startsWith(' ') || streetInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(streetLabel, '*Street must not contain leading or trailing whitespace');
                streetInput.classList.add('errorInput');
            }
            if (onlyLettersCity === 0) {
                isCorrect = false;
                addError(cityLabel, '*City must not contain numbers or special characters');
                cityInput.classList.add('errorInput');
            }
            if (cityInput.value.length < 1) {
                isCorrect = false;
                addError(cityLabel, '*Your city must contain at least 1 character');
                cityInput.classList.add('errorInput');
            }
            if (
                countryInput.value === 'Poland - PL' &&
                postalInput.value[2] === '-' &&
                postalInput.value.length === 6
            ) {
                postalCorrect = true;
            }
            if (
                countryInput.value === 'United States - US' &&
                postalInput.value[5] === '-' &&
                postalInput.value.length === 10
            ) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Italy - IT' && postalInput.value.length === 5) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Kazakhstan - KZ' && postalInput.value.length === 7) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Russian Federation - RU' && postalInput.value.length === 6) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Germany - DE' && postalInput.value.length === 5) {
                postalCorrect = true;
            }
            if (postalCorrect === false) {
                isCorrect = false;
                addError(postalLabel, "*Your country's postal code must be correct");
                postalInput.classList.add('errorInput');
            }
            if (password2Input.value !== passwordInput.value) {
                isCorrect = false;
                addError(password2Label, '*Passwords must be the same');
                password2Input.classList.add('errorInput');
            }

            if (isCorrect === false) {
                return;
            }

            const response: responseData = await postCustomer(emailInput.value, passwordInput.value);
            const userId = await response.customer.id;
            await updateCustomer(
                userId,
                firstNameInput.value,
                secondNameInput.value,
                streetInput.value,
                postalInput.value,
                cityInput.value,
                countryInput.value,
                emailInput.value,
                dateInput.value
            );
            await closeWindow(registerBack, mainPage);
        } catch (err) {
            addError(registerButton, '*This email address already registered');
            registerButton.style.marginBottom = '15px';
            registerButton.style.backgroundColor = 'rgba(255, 72, 72, 0.7)';
        }
    });
    registerWindow.querySelectorAll('input').forEach((ligInput) => {
        ligInput.addEventListener('input', () => {
            let isCorrect = true;
            let haveUpper = false;
            let haveLover = false;
            let haveNumber = false;
            let postalCorrect = false;
            let onlyLetters = 1;
            let onlyLetters2 = 1;
            let onlyLettersCity = 1;
            let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
            let numbers = '1234567890';

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
            firstNameInput.value.split('').forEach((step) => {
                if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                    onlyLetters = 0;
                }
            });
            secondNameInput.value.split('').forEach((step) => {
                if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                    onlyLetters2 = 0;
                }
            });
            cityInput.value.split('').forEach((step) => {
                if (!letters.includes(step) && !letters.toLowerCase().includes(step)) {
                    onlyLettersCity = 0;
                }
            });

            registerWindow.querySelectorAll('span').forEach((el) => {
                el.remove();
            });
            registerWindow.querySelectorAll('input').forEach((el) => {
                el.classList.remove('errorInput');
            });

            if ((emailInput.value.startsWith(' ') || emailInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(emailLabel, '*Email address must not contain leading or trailing whitespace');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.endsWith('.com') === false) {
                isCorrect = false;
                addError(emailLabel, '*Email must end with .com');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.includes('@') === false) {
                isCorrect = false;
                addError(emailLabel, '*Email address must contain an "@" symbol separating local part and domain name');
                emailInput.classList.add('errorInput');
            }

            if (passwordInput.value.length < 8) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 8 characters');
                passwordInput.classList.add('errorInput');
            }
            if ((passwordInput.value.startsWith(' ') || passwordInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(passwordLabel, '*Password must not contain leading or trailing whitespace');
                passwordInput.classList.add('errorInput');
            }
            if (haveLover === false) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 1 lowercase letter');
                passwordInput.classList.add('errorInput');
            }
            if (haveUpper === false) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 1 uppercase letter');
                passwordInput.classList.add('errorInput');
            }
            if (haveNumber === false) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 1 numder character');
                passwordInput.classList.add('errorInput');
            }
            if (firstNameInput.value.length < 1) {
                isCorrect = false;
                addError(nameLabel, '*First name must contain at least 1 character');
                firstNameInput.classList.add('errorInput');
            }
            if (secondNameInput.value.length < 1) {
                isCorrect = false;
                addError(nameLabel, '*Second name must contain at least 1 character');
                secondNameInput.classList.add('errorInput');
            }
            if (onlyLetters === 0) {
                isCorrect = false;
                addError(nameLabel, '*Name must not contain numbers or special characters');
                firstNameInput.classList.add('errorInput');
            }
            if (onlyLetters2 === 0) {
                isCorrect = false;
                addError(nameLabel, '*Name must not contain numbers or special characters');
                secondNameInput.classList.add('errorInput');
            }
            if (Number(dateInput.value.split('-')[0]) > 2010 || dateInput.value.length === 0) {
                isCorrect = false;
                addError(dateLabel, '*You must be over 13 years old');
                dateInput.classList.add('errorInput');
            }
            if (streetInput.value.length < 1) {
                isCorrect = false;
                addError(streetLabel, '*Your street must contain at least 1 character');
                streetInput.classList.add('errorInput');
            }
            if ((streetInput.value.startsWith(' ') || streetInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(streetLabel, '*Street must not contain leading or trailing whitespace');
                streetInput.classList.add('errorInput');
            }
            if (onlyLettersCity === 0) {
                isCorrect = false;
                addError(cityLabel, '*City must not contain numbers or special characters');
                cityInput.classList.add('errorInput');
            }
            if (cityInput.value.length < 1) {
                isCorrect = false;
                addError(cityLabel, '*Your city must contain at least 1 character');
                cityInput.classList.add('errorInput');
            }
            if (
                countryInput.value === 'Poland - PL' &&
                postalInput.value[2] === '-' &&
                postalInput.value.length === 6
            ) {
                postalCorrect = true;
            }
            if (
                countryInput.value === 'United States - US' &&
                postalInput.value[5] === '-' &&
                postalInput.value.length === 10
            ) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Italy - IT' && postalInput.value.length === 5) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Kazakhstan - KZ' && postalInput.value.length === 7) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Russian Federation - RU' && postalInput.value.length === 6) {
                postalCorrect = true;
            }
            if (countryInput.value === 'Germany - DE' && postalInput.value.length === 5) {
                postalCorrect = true;
            }
            if (postalCorrect === false) {
                isCorrect = false;
                addError(postalLabel, "*Your country's postal code must be correct");
                postalInput.classList.add('errorInput');
            }
            if (password2Input.value !== passwordInput.value) {
                isCorrect = false;
                addError(password2Label, '*Passwords must be the same');
                password2Input.classList.add('errorInput');
            }

            if (isCorrect === false) {
                return;
            }
        });
    });
    singInLink.addEventListener('click', () => {
        closeWindow(registerBack, mainPage);
        openWindow(loginBack, mainPage);
    });
}

createRegisterWindow();

function addCountry(box: HTMLSelectElement) {
    const counries: countryObject[] = [
        { name: 'Poland', code: '- PL' },
        { name: 'United States', code: '- US' },
        { name: 'Italy', code: '- IT' },
        { name: 'Kazakhstan', code: '- KZ' },
        { name: 'Russian Federation', code: '- RU' },
        { name: 'Germany', code: '- DE' },
    ];
    counries.forEach((step: countryObject) => {
        const country = document.createElement('option') as HTMLOptionElement;
        country.textContent = `${step.name} ${step.code}`;
        box.append(country);
    });
}

export function addError(element: HTMLElement, error: string) {
    let errorMessage = document.createElement('span');
    errorMessage.classList.add('error');
    errorMessage.textContent = error;
    element.after(errorMessage);
}
