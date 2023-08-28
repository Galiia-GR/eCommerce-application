import { helpCreateEl } from '../global/global';
import { signUpCustomer } from './signUp';
import { addError } from '../register';

export const loginBack = helpCreateEl('div', 'account-background') as HTMLElement;

export function createLoginWindow(): void {
    const mainPage = document.querySelector('.body-container') as HTMLElement;
    const loginOpen = document.querySelector('.LOGIN') as HTMLElement;

    const loginWindow = helpCreateEl('div', 'account-window') as HTMLElement;
    const loginHeader = helpCreateEl('div', 'account-window__header') as HTMLElement;
    const emailInput = document.createElement('input') as HTMLInputElement;
    const passwordInput = document.createElement('input') as HTMLInputElement;
    const loginButton = document.createElement('button') as HTMLButtonElement;
    const loginLabel = document.createElement('h2') as HTMLElement;
    const emailLabel = document.createElement('h4') as HTMLElement;
    const passwordLabel = document.createElement('h4') as HTMLElement;
    const passwordCheckbox = helpCreateEl('input', 'account-window__checkbox') as HTMLInputElement;
    const singUpLink = helpCreateEl('h5', 'sign-link') as HTMLElement;
    const loginExit = helpCreateEl('div', 'account-window__exit') as HTMLElement;

    passwordCheckbox.type = 'checkbox';
    passwordInput.type = 'password';

    emailInput.placeholder = 'Type here';
    passwordInput.placeholder = 'Type here';

    loginButton.textContent = 'Sign in';
    loginLabel.textContent = 'Login';
    emailLabel.textContent = 'Email:';
    passwordLabel.textContent = 'Password:';
    singUpLink.textContent = "Don't have account? Register Here";
    loginExit.textContent = 'x';

    loginHeader.append(loginExit);
    loginWindow.append(
        loginHeader,
        loginLabel,
        emailLabel,
        emailInput,
        passwordLabel,
        passwordInput,
        passwordCheckbox,
        loginButton,
        singUpLink
    );
    loginBack.append(loginWindow);
    loginButton.addEventListener('click', async () => {
        try {
            let isCorrect = true;
            let haveUpper = false;
            let haveLover = false;
            let haveNumber = false;
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

            loginWindow.querySelectorAll('span').forEach((el) => {
                el.remove();
            });
            loginWindow.querySelectorAll('input').forEach((el) => {
                el.classList.remove('errorInput');
            });

            if ((emailInput.value.startsWith(' ') || emailInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(emailLabel, '*Email address must not contain leading or trailing whitespace');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.includes('@') === false) {
                isCorrect = false;
                addError(emailLabel, '*Email address must contain an "@" symbol separating local part and domain name');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.split('@')[emailInput.value.split('@').length - 1].length < 5) {
                isCorrect = false;
                addError(emailLabel, '*Email address must contain domain name');
                emailInput.classList.add('errorInput');
            }
            if (passwordInput.value.length < 8) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 8 characters');
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
            if (
                (passwordInput.value[0] === ' ' || passwordInput.value[passwordInput.value.length - 1] === ' ') === true
            ) {
                isCorrect = false;
                addError(passwordLabel, 'Password must not contain leading or trailing whitespace');
                passwordInput.classList.add('errorInput');
            }

            if (isCorrect === false) {
                return;
            }

            const customerData = await signUpCustomer(emailInput.value, passwordInput.value);
            await closeWindow(loginBack, mainPage);

            let submitLogin = false;
            submitLogin = true;
            if (submitLogin) {
                window.location.hash = '/';
                const customerHeaderUserEl = document.querySelector('.logo-userName') as HTMLElement;
                customerHeaderUserEl.textContent = `Home ${customerData}`;
                console.log('submit true', customerData);
            }
        } catch (err) {
            addError(loginButton, '*Email or password is wrong');
            loginButton.style.marginBottom = '15px';
            loginButton.style.backgroundColor = 'rgba(255, 72, 72, 0.7)';
        }
    });
    loginWindow.querySelectorAll('input').forEach((logInput) => {
        logInput.addEventListener('input', () => {
            let isCorrect = true;
            let haveUpper = false;
            let haveLover = false;
            let haveNumber = false;
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

            loginWindow.querySelectorAll('span').forEach((el) => {
                el.remove();
            });
            loginWindow.querySelectorAll('input').forEach((el) => {
                el.classList.remove('errorInput');
            });

            if ((emailInput.value.startsWith(' ') || emailInput.value.endsWith(' ')) === true) {
                isCorrect = false;
                addError(emailLabel, '*Email address must not contain leading or trailing whitespace');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.includes('@') === false) {
                isCorrect = false;
                addError(emailLabel, '*Email address must contain an "@" symbol separating local part and domain name');
                emailInput.classList.add('errorInput');
            }
            if (emailInput.value.split('@')[emailInput.value.split('@').length - 1].length < 5) {
                isCorrect = false;
                addError(emailLabel, '*Email address must contain domain name');
                emailInput.classList.add('errorInput');
            }
            if (passwordInput.value.length < 8) {
                isCorrect = false;
                addError(passwordLabel, '*Password must contain at least 8 characters');
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
            if (
                (passwordInput.value[0] === ' ' || passwordInput.value[passwordInput.value.length - 1] === ' ') === true
            ) {
                isCorrect = false;
                addError(passwordLabel, 'Password must not contain leading or trailing whitespace');
                passwordInput.classList.add('errorInput');
            }

            if (isCorrect === false) {
                return;
            }
        });
    });
    loginOpen.addEventListener('click', () => {
        openWindow(loginBack, mainPage);
    });
    loginExit.addEventListener('click', () => {
        closeWindow(loginBack, mainPage);
    });
    loginBack.addEventListener('click', (target) => {
        if (target.target === loginBack) {
            closeWindow(loginBack, mainPage);
        }
    });
    showPassword(passwordInput, passwordCheckbox);

    singUpLink.addEventListener('click', () => {
        window.location.hash = '/register';
    });
}

export function openWindow(window: HTMLElement, container: HTMLElement): void {
    container.append(window);
    setTimeout(() => {
        window.style.opacity = '1';
    });
}

export function closeWindow(window: HTMLElement, container: HTMLElement): void {
    window.style.opacity = '0';
    setTimeout(() => {
        container.removeChild(window);
    }, 200);
}

export function showPassword(input: HTMLInputElement, checkbox: HTMLInputElement): void {
    checkbox.addEventListener('click', () => {
        if (checkbox.checked === true) {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    });
}

createLoginWindow();
