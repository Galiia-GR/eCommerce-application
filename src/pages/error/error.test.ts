import { createError } from './error';

jest.mock('../../assets/images/404_1.png', () => 'fake-404-image');

describe('createError', () => {
    let mainTag: HTMLElement;

    beforeEach(() => {
        mainTag = document.createElement('main');
        mainTag.className = 'main';
        document.body.appendChild(mainTag);
    });

    it('should create error page with correct content', () => {
        // Act

        createError();
        // Assert
        const sectionError = mainTag.querySelector('.error-404-container');
        expect(sectionError).not.toBeNull();

        const headerError = sectionError?.querySelector('.title-404');
        expect(headerError).not.toBeNull();

        const footsImgContainer = sectionError?.querySelector('.foots-404-container');
        expect(footsImgContainer).not.toBeNull();

        const footImg = footsImgContainer?.querySelector('.img__404');
        expect(footImg?.getAttribute('src')).toBe('fake-404-image');
    });
});
