import { mocked } from 'ts-jest/utils';
import { KENALL, NTACorporateInfoSearchMode } from '..';
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
        building: '総務省ビル',
        floor: '８階',
        town_partial: false,
        town_chome: false,
        town_addressed_koaza: false,
        town_multi: false,
        corporation: {
          name: '総務省',
          name_kana: 'ソウムショウ',
          block_lot: '２丁目１−２総務省ビル８階',
          block_lot_num: '2-1-2',
          post_office: '銀座',
          code_type: 0,
        },
      },
    ],
  },
])('getAddress method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
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
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
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
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
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

test.each([
  {
    version: '2021-09-15',
    data: {
      address_image_id: null,
      address_outside: '',
      address_outside_image_id: null,
      assignment_date: '2015-10-05',
      change_cause: '',
      change_date: '2021-01-04',
      city_name: '千代田区',
      close_cause: null,
      close_date: null,
      corporate_number: '2021001052596',
      correct: '0',
      en_address_line: '',
      en_address_outside: '',
      en_name: '',
      en_prefecture_name: 'Tokyo',
      furigana: 'オープンコレクター',
      hihyoji: '0',
      jisx0402: '13101',
      kind: '301',
      name: '株式会社オープンコレクター',
      name_image_id: null,
      post_code: '1020083',
      prefecture_name: '東京都',
      process: '12',
      published_date: '2021-08-31',
      sequence_number: '1394014',
      street_number: '麹町３丁目１２－１４麹町駅前ヒルトップ８階',
      successor_corporate_number: null,
      update_date: '2021-01-12',
    },
  },
  {
    version: '2021-09-15',
    data: {
      address_image_id: null,
      address_outside: '',
      address_outside_image_id: null,
      assignment_date: '2015-10-05',
      change_cause: '',
      change_date: '2021-01-04',
      city_name: '千代田区',
      close_cause: null,
      close_date: null,
      corporate_number: '2021001052596',
      correct: '0',
      en_address_line: '',
      en_address_outside: '',
      en_name: '',
      en_prefecture_name: 'Tokyo',
      furigana: 'オープンコレクター',
      hihyoji: '0',
      jisx0402: '13101',
      kind: '301',
      name: '株式会社オープンコレクター',
      name_image_id: null,
      post_code: '1020083',
      prefecture_name: '東京都',
      process: '12',
      published_date: '2021-08-31',
      sequence_number: '1394014',
      street_number: '麹町３丁目１２－１４麹町駅前ヒルトップ８階',
      town: '麹町',
      block_lot_num: '3-12-14',
      building: '麹町駅前ヒルトップ',
      floor_room: '８階',
      successor_corporate_number: null,
      update_date: '2021-01-12',
    },
  },
])('getNTACorporateInfo method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  const result = await ka.getNTACorporateInfo('0000000000000');
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/houjinbangou/0000000000000');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      version: undefined,
    },
  });
  expect(result).toEqual(fixture);
});

test.each([
  {
    version: '2021-09-15',
    data: [
      {
        address_image_id: null,
        address_outside: '',
        address_outside_image_id: null,
        assignment_date: '2015-10-05',
        change_cause: '',
        change_date: '2021-01-04',
        city_name: '千代田区',
        close_cause: null,
        close_date: null,
        corporate_number: '2021001052596',
        correct: '0',
        en_address_line: '',
        en_address_outside: '',
        en_name: '',
        en_prefecture_name: 'Tokyo',
        furigana: 'オープンコレクター',
        hihyoji: '0',
        jisx0402: '13101',
        kind: '301',
        name: '株式会社オープンコレクター',
        name_image_id: null,
        post_code: '1020083',
        prefecture_name: '東京都',
        process: '12',
        published_date: '2021-08-31',
        sequence_number: '1394014',
        street_number: '麹町３丁目１２－１４麹町駅前ヒルトップ８階',
        successor_corporate_number: null,
        update_date: '2021-01-12',
      },
    ],
    query: 'オープンコレクター',
    count: 1,
    offset: 0,
    limit: 1,
    facets: null,
  },
  {
    version: '2021-09-15',
    data: [
      {
        address_image_id: null,
        address_outside: '',
        address_outside_image_id: null,
        assignment_date: '2015-10-05',
        change_cause: '',
        change_date: '2021-01-04',
        city_name: '千代田区',
        close_cause: null,
        close_date: null,
        corporate_number: '2021001052596',
        correct: '0',
        en_address_line: '',
        en_address_outside: '',
        en_name: '',
        en_prefecture_name: 'Tokyo',
        furigana: 'オープンコレクター',
        hihyoji: '0',
        jisx0402: '13101',
        kind: '301',
        name: '株式会社オープンコレクター',
        name_image_id: null,
        post_code: '1020083',
        prefecture_name: '東京都',
        process: '12',
        published_date: '2021-08-31',
        sequence_number: '1394014',
        street_number: '麹町３丁目１２－１４麹町駅前ヒルトップ８階',
        town: '麹町',
        block_lot_num: '3-12-14',
        building: '麹町駅前ヒルトップ',
        floor_room: '８階',
        successor_corporate_number: null,
        update_date: '2021-01-12',
      },
    ],
    query: 'オープンコレクター',
    count: 1,
    offset: 0,
    limit: 1,
    facets: null,
  },
])('searchNTACorporateInfo method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
  mockedAxiosGet.mockResolvedValue({
    data: fixture,
  });
  const ka = new KENALL('key');
  const options = {
    query: 'オープンコレクター',
    mode: 'exact' as NTACorporateInfoSearchMode,
    limit: 1,
  };
  const result = await ka.searchNTACorporateInfo(options);
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/houjinbangou');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    params: {
      q: 'オープンコレクター',
      mode: 'exact',
      limit: '1',
    },
  });
  expect(result).toEqual(fixture);
});
