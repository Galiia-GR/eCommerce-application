import { helpCreateEl, createHeader, createFooter } from './global';

jest.mock('../../assets/images/fish.svg', () => 'fake-fish-image');
jest.mock('../../assets/images/gitSvg.svg', () => 'fake-git-image');
jest.mock('../../assets/images/rss.svg', () => 'fake-rss-image');

describe('helpCreateEl', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('should create an element with the given tag name and set className', () => {
        const tagName = 'div';
        const className = 'test-class';
        // Act
        const element = helpCreateEl(tagName, className);
        document.body.append(element);

        // Assert

        expect(element.tagName.toLowerCase()).toBe(tagName);
        expect(element.className).toBe(className);
    });
});

describe('createHeader', () => {
    it('should create header with navigation items', () => {
        // Act
        createHeader();
        // Assert
        const logoImg = document.querySelector('.logo_img');
        expect(logoImg).not.toBeNull();
        expect(logoImg?.getAttribute('alt')).toBe('logo');

        const navigationItems = document.querySelectorAll('.navigation-item');
        expect(navigationItems.length).toBe(6);

        const navText = Array.from(navigationItems).map((item) => item.textContent);
        const expectedNavText = ['SHOP', 'SHIPPING', 'ABOUT', 'CONTACTS', 'LOGIN', 'REGISTER'];
        expect(navText).toEqual(expectedNavText);
    });
});

describe('createFooter', () => {
    it('should create footer with correct content', () => {
        // Act
        createFooter();

        // Assert
        const footer = document.querySelector('.footer');
        expect(footer).not.toBeNull();

        const rssImage = document.querySelector('.RSS img');
        expect(rssImage?.getAttribute('src')).toBe('fake-rss-image');

        const gitImages = document.querySelectorAll('footer a img');
        expect(gitImages.length).toBe(4);
    });
});
