import './styles/style.css';
import './pages/global/global';
import './pages/routing';
import './pages/home/home';
import './pages/about/about';
import './pages/login';
import './pages/register';
import './pages/register/getBearerToken';
import './pages/register/getInf';
import './pages/register/createCustomer';
import './pages/register/getCustomer';
import './pages/register/updateCustomer';
import './pages/register/setDefaultShipping';
import './pages/global/hamburger';
import './pages/login/signUp/autoSignUp';
import './pages/home/connectHomeShop';
import './pages/basket/createBasket';

window.location.hash = '/';
sessionStorage.setItem('width', '0');

function test() {
    console.log('Asynchronous sloths test for test');
}
test();
