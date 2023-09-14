import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getInfo } from './index';

jest.mock('../getBearerToken', () => ({
    getToken: jest.fn().mockResolvedValue('fake-token'),
}));

describe('getInfo', () => {
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    it('should make a GET request with proper headers', async () => {
        const expectedUrl = 'https://api.us-central1.gcp.commercetools.com/ecommercerszxc22845345034582/';
        const responseData = { data: 'some response data' };

        mockAxios.onGet(expectedUrl, { headers: { Authorization: 'Bearer fake-token' } }).reply(200, responseData);

        const response = await getInfo();

        expect(mockAxios.history.get.length).toBe(1);
        expect(mockAxios.history.get[0].url).toBe(expectedUrl);
        expect(response.data).toEqual(responseData);
    });
});
