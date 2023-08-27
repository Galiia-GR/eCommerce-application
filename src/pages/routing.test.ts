import { menuNavClick } from './routing';

jest.mock('../../__mocks__/footprintImg.png');

describe('menuNavClick', () => {
    let originalQuerySelector: typeof document.querySelector;
    let mockQuerySelector: jest.Mock;

    beforeEach(() => {
        originalQuerySelector = document.querySelector;
        mockQuerySelector = jest.fn();
        document.querySelector = mockQuerySelector;
    });

    afterEach(() => {
        document.querySelector = originalQuerySelector;
        jest.clearAllMocks();
    });

    it('attaches click event listeners to navigation items and home', () => {
        const mockElement = document.createElement('div');
        mockQuerySelector.mockReturnValue(mockElement);

        menuNavClick();

        expect(mockQuerySelector).toHaveBeenCalledWith('.logo_link');

        const mockEvent = new Event('click');
        mockElement.dispatchEvent(mockEvent);
    });
});
