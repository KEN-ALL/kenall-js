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
        postal_code: '0600000',
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
    version: '2020-08-31',
    data: [
      {
        jisx0402 : '01101',
        old_code : '060  ',
        postal_code: '0600000',
        prefecture: '北海道',
        prefecture_kana: 'ホッカイドウ',
        city: '札幌市中央区',
        city_kana: 'サッポロシチュウオウク',
        town: '',
        town_kana: '',
        town_raw: '以下に掲載がない場合',
        town_kana_raw: 'イカニケイサイガナイバアイ',
        koaza : '',
        kyoto_street : '',
        building : '',
        floor : '',
        town_partial: false,
        town_chome: false,
        town_addressed_koaza: false,
        town_multi: false,
      },
    ],
  };
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  const result = await ka.getAddress('0000000');
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/postalcode/0000000');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      version: undefined,
    },
  });
  expect(result).toEqual(fixture);
});
