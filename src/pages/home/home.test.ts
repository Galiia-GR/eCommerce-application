import { createMain } from './home';

jest.mock('../../assets/images/home/bg1.jpg', () => 'bg-image');
jest.mock('../../assets/images/home/img1.png', () => 'fake-image-1');
jest.mock('../../assets/images/home/img2.png', () => 'fake-image-2');
jest.mock('../../assets/images/home/img3.png', () => 'fake-image-3');
jest.mock('../../assets/images/home/img4.png', () => 'fake-image-4');
jest.mock('../../assets/images/home/img5.png', () => 'fake-image-5');
jest.mock('../../assets/images/home/img6.png', () => 'fake-image-6');
jest.mock('../../assets/images/home/img7.png', () => 'fake-image-7');
jest.mock('../../assets/images/home/img8.png', () => 'fake-image-8');
jest.mock('../../assets/images/home/img9.png', () => 'fake-image-9');
jest.mock('../../assets/images/home/img10.png', () => 'fake-image-10');
jest.mock('../../assets/images/home/img11.png', () => 'fake-image-11');
jest.mock('../../assets/images/home/img12.png', () => 'fake-image-12');
jest.mock('../../assets/images/home/img13.png', () => 'fake-image-13');
jest.mock('../../assets/images/home/img14.png', () => 'fake-image-14');
jest.mock('../../assets/images/home/img15.png', () => 'fake-image-15');
jest.mock('../../assets/images/home/img16.png', () => 'fake-image-16');
jest.mock('../../assets/images/home/img17.png', () => 'fake-image-17');
jest.mock('../../assets/images/home/img18.png', () => 'fake-image-18');

describe('createMain', () => {
    it('should create main content with fist', () => {
        // Act
        createMain();
        // Assert
        const mainTag = document.querySelector('main');
        expect(mainTag).not.toBeNull();
        const mainContainer = mainTag?.querySelector('.main-container');
        expect(mainContainer).not.toBeNull();

        const mainTitle = mainContainer?.querySelector('.main-title');
        expect(mainTitle?.textContent).toBe('MARINE FISH');

        const homeFishContainer = mainContainer?.querySelector('.home-fish-container');
        expect(homeFishContainer).not.toBeNull();

        const fishContainers = homeFishContainer?.querySelectorAll('.home-fish__container');
        expect(fishContainers?.length).toBe(18);
    });
});
