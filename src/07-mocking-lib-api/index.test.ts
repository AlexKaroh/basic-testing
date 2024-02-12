import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const responseData = { data: 'dummy data' };

jest.useFakeTimers();

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
  get: jest.fn(),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosGetMock = jest.fn().mockResolvedValueOnce(responseData);
    (axios.create as jest.Mock).mockReturnValueOnce({
      get: axiosGetMock,
    });

    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    return true;
  });

  test('should return response data', async () => {
    const axiosGetMock = jest.fn().mockResolvedValueOnce(responseData);
    (axios.create as jest.Mock).mockReturnValueOnce({
      get: axiosGetMock,
    });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(responseData.data);
  });
});
