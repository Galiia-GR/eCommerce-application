import axios from 'axios';

export async function autoSignUpCustomer(): Promise<void> {
    const loginOpen = document.querySelector('.LOGIN') as HTMLElement;
    if (localStorage.getItem('accessToken')) {
        const response = await axios.get(
            'https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/me',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const customerfirstName = response.data.firstName;
        const customerHeaderUserEl = document.querySelector('.logo-userName') as HTMLElement;
        localStorage.setItem('version', response.data.version);
        customerHeaderUserEl.textContent = `Home ${customerfirstName}`;
        loginOpen.textContent = 'LOG OUT';
    }
}

autoSignUpCustomer();
