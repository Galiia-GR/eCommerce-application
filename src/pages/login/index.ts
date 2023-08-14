import { helpCreateEl } from '../global/global';

export function createLoginWindow(): void {
    const mainPage = document.querySelector('.body-container') as HTMLElement;
    const loginOpen = document.querySelector('.navigation-item:nth-child(6)') as HTMLElement;

    const loginBack = helpCreateEl('div', 'account-background') as HTMLElement;
    const loginWindow = helpCreateEl('div', 'account-window') as HTMLElement;
    const loginHeader = helpCreateEl('div', 'account-window__header') as HTMLElement;
    const emailInput = document.createElement('input') as HTMLInputElement;
    const passwordInput = document.createElement('input') as HTMLInputElement;
    const loginButton = document.createElement('button') as HTMLButtonElement;
    const loginLabel = document.createElement('h2') as HTMLElement;
    const emailLabel = document.createElement('h4') as HTMLElement;
    const passwordLabel = document.createElement('h4') as HTMLElement;
    const passwordCheckbox = helpCreateEl('input', 'account-window__checkbox') as HTMLInputElement;
    const singUpLink = document.createElement('h5') as HTMLElement;
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
    loginExit.textContent = '×';
    loginOpen.innerHTML = 'LOGIN';
    loginOpen.style.cursor = 'pointer';

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
}

export function openWindow(window: HTMLElement, container: HTMLElement): void {
    container.append(window);
    setTimeout(() => {
        window.style.opacity = '1';
        console.log(window);
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
