import { mocked } from 'ts-jest/utils';
import { KENALL } from '..';
import { AxiosInstance } from 'axios';
import axios from 'axios';

jest.mock('axios');


test('default API base', () => {
  {
    const ka = new KENALL('key');
    expect(ka.apibase).toBe('https://api.kenall.jp/v1');
  }
  {
    const ka = new KENALL('key', {});
    expect(ka.apibase).toBe('https://api.kenall.jp/v1');
  }
});

test('override API base', () => {
  const ka = new KENALL('key', {apibase: 'https://example.com'});
  expect(ka.apibase).toBe('https://example.com');
});

test('api key is correctly propagated', () => {
  expect(new KENALL('key').apikey).toBe('key');
});

test('request method', async () => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval; 
  });
  const fixture = {
    version: '1',
    data: [
      {
        postalcode: '000-0000',
      },
    ],
  };
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  const result = await ka.request('some/endpoint', {foo: 'foo'});
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('some/endpoint');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      foo: 'foo',
    },
  });
  expect(result).toEqual(fixture); 
});

test('get method', async () => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval; 
  });
  const fixture = {
    version: '1',
    data: [
      {
        postalcode: '000-0000',
        prefecture: '北海道',
        prefecture_kana: 'ホッカイドウ',
        city: '市区町村',
        city_kana: 'シクチョウソン',
        town: '町名番地',
        town_kana: 'チョウメイバンチ',
        town_partial: false,
        town_chome: false,
        town_koazabanchi: false,
        town_multi: false,
      },
    ],
  };
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  const result = await ka.get('0000000');
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/postalcode/0000000');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      version: undefined,
    },
  });
  expect(result).toEqual(fixture); 
});
