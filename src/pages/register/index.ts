import { openWindow, closeWindow, showPassword } from '../login';
import { helpCreateEl } from '../global/global';

export function createRegisterWindow(): void {
    const mainPage = document.querySelector('.body-container') as HTMLElement;
    const registerBack = helpCreateEl('div', 'account-background') as HTMLElement;
    const registerWindow = helpCreateEl('div', 'account-window') as HTMLElement;
    const registerHeader = helpCreateEl('div', 'account-window__header') as HTMLElement;
    const emailInput = document.createElement('input') as HTMLInputElement;
    const passwordInput = document.createElement('input') as HTMLInputElement;
    const password2Input = document.createElement('input') as HTMLInputElement;
    const nameContainer = helpCreateEl('h4', 'double-container') as HTMLElement;
    const nameLabel = document.createElement('h4') as HTMLElement;
    const firstNameInput = document.createElement('input') as HTMLInputElement;
    const secondNameInput = document.createElement('input') as HTMLInputElement;
    const registerButton = document.createElement('button') as HTMLButtonElement;
    const registerLabel = document.createElement('h2') as HTMLElement;
    const emailLabel = document.createElement('h4') as HTMLElement;
    const passwordLabel = document.createElement('h4') as HTMLElement;
    const password2Label = document.createElement('h4') as HTMLElement;
    const passwordCheckbox = helpCreateEl('input', 'account-window__checkbox') as HTMLInputElement;
    const passwordCheckbox2 = helpCreateEl('input', 'account-window__checkbox') as HTMLInputElement;
    const singInLink = document.createElement('h5') as HTMLElement;
    const registerExit = helpCreateEl('div', 'account-window__exit') as HTMLElement;
    const registerOpen = document.querySelector('.navigation-item:nth-child(6)') as HTMLElement;

    passwordCheckbox.type = 'checkbox';
    passwordCheckbox2.type = 'checkbox';
    passwordInput.type = 'password';
    password2Input.type = 'password';

    emailInput.placeholder = 'Type here';
    passwordInput.placeholder = 'Type here';
    firstNameInput.placeholder = 'First name';
    secondNameInput.placeholder = 'Last name';
    password2Input.placeholder = 'Type here';

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

    registerHeader.append(registerExit);
    nameContainer.append(firstNameInput, secondNameInput);
    registerWindow.append(
        registerHeader,
        registerLabel,
        nameLabel,
        nameContainer,
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
}

createRegisterWindow();
