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
  const ka = new KENALL('key', { apibase: 'https://example.com' });
  expect(ka.apibase).toBe('https://example.com');
});

test('api key is correctly propagated', () => {
  expect(new KENALL('key').apikey).toBe('key');
});

test.each([
  {
    version: '2020-08-31',
    data: [
      {
        jisx0402: '01101',
        old_code: '060',
        postal_code: '0600000',
        prefecture: '北海道',
        prefecture_kana: 'ホッカイドウ',
        city: '札幌市中央区',
        city_kana: 'サッポロシチュウオウク',
        town: '',
        town_kana: '',
        town_raw: '以下に掲載がない場合',
        town_kana_raw: 'イカニケイサイガナイバアイ',
        koaza: '',
        kyoto_street: '',
        building: '',
        floor: '',
        town_partial: false,
        town_chome: false,
        town_addressed_koaza: false,
        town_multi: false,
        corporation: null,
      },
    ],
  },
  {
    version: '2020-08-31',
    data: [
      {
        jisx0402: '13101',
        old_code: '100',
        postal_code: '1008926',
        prefecture: '東京都',
        prefecture_kana: '',
        city: '千代田区',
        city_kana: '',
        town: '霞ヶ関',
        town_kana: '',
        town_raw: '',
        town_kana_raw: '',
        koaza: '',
        kyoto_street: '',
        building: '',
        floor: '',
        town_partial: false,
        town_chome: false,
        town_addressed_koaza: false,
        town_multi: false,
        corporation: {
          name: '総務省',
          name_kana: 'ソウムショウ',
          block_lot: '２丁目１−２',
          post_office: '銀座',
          code_type: 0,
        },
      },
    ],
  },
])('getAddress method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn(
    (...args): AxiosInstance => {
      const retval = jest.requireActual('axios').create(...args);
      retval.get = mockedAxiosGet;
      return retval;
    }
  );
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

test('getAddress method: normalize postal code before sending request', async () => {
  const fixture = {
    version: '2020-08-31',
    data: [],
  };
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn(
    (...args): AxiosInstance => {
      const retval = jest.requireActual('axios').create(...args);
      retval.get = mockedAxiosGet;
      return retval;
    }
  );
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  await ka.getAddress('000-0000');
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/postalcode/0000000');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      version: undefined,
    },
  });
});

test.each([
  {
    version: '2020-08-31',
    data: [
      {
        jisx0402: '01101',
        prefecture_code: '01',
        city_code: '101',
        prefecture_kana: 'ホッカイドウ',
        city_kana: 'サッポロシチュウオウク',
        prefecture: '北海道',
        city: '札幌市中央区',
      },
      {
        jisx0402: '01102',
        prefecture_code: '01',
        city_code: '102',
        prefecture_kana: 'ホッカイドウ',
        city_kana: 'サッポロシキタク',
        prefecture: '北海道',
        city: '札幌市北区',
      },
    ],
  },
])('getCities method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn(
    (...args): AxiosInstance => {
      const retval = jest.requireActual('axios').create(...args);
      retval.get = mockedAxiosGet;
      return retval;
    }
  );
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  const result = await ka.getCities('01');
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/cities/01');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      version: undefined,
    },
  });
  expect(result).toEqual(fixture);
});
