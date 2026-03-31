import { expect, jest, test } from '@jest/globals';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

jest.mock('../fetch_shim.js');

const addressResolverResponsesV20220901 = [
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
];

const addressResolverResponsesV20221101 = [
  {
    version: '2020-08-31',
    data: [
      {
        jisx0402: '01101',
        old_code: '060',
        postal_code: '0600000',
        prefecture: '北海道',
        prefecture_kana: 'ホッカイドウ',
        prefecture_roman: 'Hokkaido',
        city: '札幌市中央区',
        city_kana: 'サッポロシチュウオウク',
        city_roman: 'Chuo-ku, Sapporo',
        county: '',
        county_kana: '',
        county_roman: '',
        city_without_county_and_ward: '札幌市',
        city_without_county_and_ward_kana: 'サッポロシ',
        city_without_county_and_ward_roman: 'Sapporo',
        city_ward: '中央区',
        city_ward_kana: 'チュウオウク',
        city_ward_roman: 'Chuo',
        town: '',
        town_kana: '',
        town_roman: '',
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
        town_jukyohyoji: false,
        update_status: 0,
        update_reason: 0,
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
        prefecture_kana: 'トウキョウト',
        prefecture_roman: 'Tokyo',
        city: '千代田区',
        city_kana: '',
        city_roman: '',
        county: '',
        county_kana: '',
        county_roman: '',
        city_without_county_and_ward: '千代田区',
        city_without_county_and_ward_kana: '',
        city_without_county_and_ward_roman: '',
        city_ward: '',
        city_ward_kana: '',
        city_ward_roman: '',
        town: '霞ヶ関',
        town_kana: '',
        town_roman: '',
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
        town_jukyohyoji: false,
        update_status: 0,
        update_reason: 0,
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
];

const addressResolverResponsesExtra = [
  {
    input: {
      version: '2020-08-31',
      data: [
        {
          jisx0402: '01101',
          old_code: '060',
          postal_code: '0600000',
          prefecture: '北海道',
          prefecture_kana: 'ホッカイドウ',
          prefecture_roman: 'Hokkaido',
          city: '札幌市中央区',
          city_kana: 'サッポロシチュウオウク',
          city_roman: 'Chuo-ku, Sapporo',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '札幌市',
          city_without_county_and_ward_kana: 'サッポロシ',
          city_without_county_and_ward_roman: 'Sapporo',
          city_ward: '中央区',
          city_ward_kana: 'チュウオウク',
          city_ward_roman: 'Chuo',
          town: '',
          town_kana: '',
          town_roman: '',
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
          town_jukyohyoji: false,
          update_status: 0,
          update_reason: 0,
          corporation: null,
          extra: 'extra',
        },
      ],
    },
    expected: {
      version: '2020-08-31',
      data: [
        {
          jisx0402: '01101',
          old_code: '060',
          postal_code: '0600000',
          prefecture: '北海道',
          prefecture_kana: 'ホッカイドウ',
          prefecture_roman: 'Hokkaido',
          city: '札幌市中央区',
          city_kana: 'サッポロシチュウオウク',
          city_roman: 'Chuo-ku, Sapporo',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '札幌市',
          city_without_county_and_ward_kana: 'サッポロシ',
          city_without_county_and_ward_roman: 'Sapporo',
          city_ward: '中央区',
          city_ward_kana: 'チュウオウク',
          city_ward_roman: 'Chuo',
          town: '',
          town_kana: '',
          town_roman: '',
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
          town_jukyohyoji: false,
          update_status: 0,
          update_reason: 0,
          corporation: null,
        },
      ],
    },
  },
  {
    input: {
      version: '2020-08-31',
      data: [
        {
          jisx0402: '13101',
          old_code: '100',
          postal_code: '1008926',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          prefecture_roman: 'Tokyo',
          city: '千代田区',
          city_kana: '',
          city_roman: '',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '千代田区',
          city_without_county_and_ward_kana: '',
          city_without_county_and_ward_roman: '',
          city_ward: '',
          city_ward_kana: '',
          city_ward_roman: '',
          town: '霞ヶ関',
          town_kana: '',
          town_roman: '',
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
          town_jukyohyoji: false,
          update_status: 0,
          update_reason: 0,
          corporation: {
            name: '総務省',
            name_kana: 'ソウムショウ',
            block_lot: '２丁目１−２総務省ビル８階',
            block_lot_num: '2-1-2',
            post_office: '銀座',
            code_type: 0,
            extra: 'extra',
          },
        },
      ],
    },
    expected: {
      version: '2020-08-31',
      data: [
        {
          jisx0402: '13101',
          old_code: '100',
          postal_code: '1008926',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          prefecture_roman: 'Tokyo',
          city: '千代田区',
          city_kana: '',
          city_roman: '',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '千代田区',
          city_without_county_and_ward_kana: '',
          city_without_county_and_ward_roman: '',
          city_ward: '',
          city_ward_kana: '',
          city_ward_roman: '',
          town: '霞ヶ関',
          town_kana: '',
          town_roman: '',
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
          town_jukyohyoji: false,
          update_status: 0,
          update_reason: 0,
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
  },
];

test.each(addressResolverResponsesV20220901)(
  'getAddress method succeeds with compatible mode and old API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getAddress('0000000');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/0000000');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(addressResolverResponsesV20221101)(
  'getAddress method succeeds with compatible mode and newer API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getAddress('0000000');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/0000000');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(addressResolverResponsesExtra)(
  'getAddress method succeeds with compatible mode and unknown API version',
  async (case_) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(case_.input),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getAddress('0000000');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/0000000');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(case_.expected);
  }
);

test.each(addressResolverResponsesV20220901)(
  'getAddress method succeeds with strict mode and old API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getAddress('0000000', undefined, '2022-09-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/0000000');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        'KenAll-API-Version': '2022-09-01',
      },
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(addressResolverResponsesV20221101)(
  'getAddress method succeeds with strict mode and newer API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getAddress('0000000', undefined, '2022-11-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/0000000');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        'KenAll-API-Version': '2022-11-01',
      },
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test('getAddress method: normalize postal code before sending request', async () => {
  const fixture = {
    version: '2020-08-31',
    data: [],
  };
  const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
  jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: jest.fn<Response['json']>().mockResolvedValue(fixture),
  } as unknown as Response);
  const ka = new KENALL('key');
  await ka.getAddress('000-0000');
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/0000000');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
});

const cityResolverResponsesV20220901 = [
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
];

const cityResolverResponsesV20221101 = [
  {
    version: '2020-08-31',
    data: [
      {
        jisx0402: '01101',
        prefecture_code: '01',
        city_code: '101',
        prefecture: '北海道',
        prefecture_kana: 'ホッカイドウ',
        prefecture_roman: 'Hokkaido',
        city: '札幌市中央区',
        city_kana: 'サッポロシチュウオウク',
        city_roman: 'Chuo-ku, Sapporo',
      },
      {
        jisx0402: '01102',
        prefecture_code: '01',
        city_code: '102',
        prefecture: '北海道',
        prefecture_kana: 'ホッカイドウ',
        prefecture_roman: 'Hokkaido',
        city: '札幌市北区',
        city_kana: 'サッポロシキタク',
        city_roman: 'Kita-ku, Sapporo',
      },
    ],
  },
];

const cityResolverResponsesV20230901 = [
  {
    input: {
      version: '2020-08-31',
      data: [
        {
          jisx0402: '01101',
          prefecture_code: '01',
          city_code: '101',
          prefecture: '北海道',
          prefecture_kana: 'ホッカイドウ',
          prefecture_roman: 'Hokkaido',
          city: '札幌市中央区',
          city_kana: 'サッポロシチュウオウク',
          city_roman: 'Chuo-ku, Sapporo',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '札幌市',
          city_without_county_and_ward_kana: 'サッポロシ',
          city_without_county_and_ward_roman: 'Sapporo',
        },
        {
          jisx0402: '01102',
          prefecture_code: '01',
          city_code: '102',
          prefecture: '北海道',
          prefecture_kana: 'ホッカイドウ',
          prefecture_roman: 'Hokkaido',
          city: '札幌市北区',
          city_kana: 'サッポロシキタク',
          city_roman: 'Kita-ku, Sapporo',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '札幌市',
          city_without_county_and_ward_kana: 'サッポロシ',
          city_without_county_and_ward_roman: 'Sapporo',
        },
      ],
    },
    expectedCompatible: {
      version: '2020-08-31',
      data: [
        {
          jisx0402: '01101',
          prefecture_code: '01',
          city_code: '101',
          prefecture: '北海道',
          prefecture_kana: 'ホッカイドウ',
          prefecture_roman: 'Hokkaido',
          city: '札幌市中央区',
          city_kana: 'サッポロシチュウオウク',
          city_roman: 'Chuo-ku, Sapporo',
        },
        {
          jisx0402: '01102',
          prefecture_code: '01',
          city_code: '102',
          prefecture: '北海道',
          prefecture_kana: 'ホッカイドウ',
          prefecture_roman: 'Hokkaido',
          city: '札幌市北区',
          city_kana: 'サッポロシキタク',
          city_roman: 'Kita-ku, Sapporo',
        },
      ],
    },
  },
];

test.each(cityResolverResponsesV20220901)(
  'getCities method succeeds with compatible mode and old API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getCities('01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./cities/01');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(cityResolverResponsesV20221101)(
  'getCities method succeeds with compatible mode and newer API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getCities('01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./cities/01');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(cityResolverResponsesV20230901)(
  'getCities method succeeds with compatible mode and newer API',
  async (case_) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(case_.input),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getCities('01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./cities/01');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(case_.expectedCompatible);
  }
);

test.each(cityResolverResponsesV20220901)(
  'getCities method succeeds with strict mode and old API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getCities('01', undefined, '2022-09-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./cities/01');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        'KenAll-API-Version': '2022-09-01',
      },
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(cityResolverResponsesV20221101)(
  'getCities method succeeds with strict mode and newer API',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getCities('01', undefined, '2022-11-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./cities/01');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        'KenAll-API-Version': '2022-11-01',
      },
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(cityResolverResponsesV20230901)(
  'getCities method succeeds with strict mode and newer API',
  async (case_) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(case_.input),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getCities('01', undefined, '2023-09-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./cities/01');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        'KenAll-API-Version': '2023-09-01',
      },
      params: {},
    });
    expect(result).toEqual(case_.input);
  }
);

const searchAddressResponseV20220901 = [
  {
    expected: {
      secondArg: {
        headers: {},
        params: {
          q: '東京都 千代田区 麹町',
          limit: '1',
        },
      },
      data: {
        version: '2021-09-15',
        data: [
          {
            jisx0402: '13101',
            old_code: '102',
            postal_code: '1020083',
            prefecture: '東京都',
            prefecture_kana: 'トウキョウト',
            city: '千代田区',
            city_kana: 'チヨダク',
            town: '麹町',
            town_kana: 'コウジマチ',
            town_raw: '麹町',
            town_kana_raw: 'コウジマチ',
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
        query: {
          q: '東京都 千代田区 麹町',
          t: null,
          prefecture: '東京都',
          county: null,
          city: '千代田区',
          city_ward: null,
          town: '麹町',
          kyoto_street: null,
          block_lot_num: '3-12-14',
          building: '麹町駅前ヒルトップ',
          floor_room: '8F',
        },
        count: 1,
        offset: 0,
        limit: 1,
        facets: null,
      },
    },
    options: {
      q: '東京都 千代田区 麹町',
      limit: 1,
    },
    response: {
      version: '2021-09-15',
      data: [
        {
          jisx0402: '13101',
          old_code: '102',
          postal_code: '1020083',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          city: '千代田区',
          city_kana: 'チヨダク',
          town: '麹町',
          town_kana: 'コウジマチ',
          town_raw: '麹町',
          town_kana_raw: 'コウジマチ',
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
      query: {
        q: '東京都 千代田区 麹町',
        t: null,
        prefecture: '東京都',
        county: null,
        city: '千代田区',
        city_ward: null,
        town: '麹町',
        kyoto_street: null,
        block_lot_num: '3-12-14',
        building: '麹町駅前ヒルトップ',
        floor_room: '8F',
      },
      count: 1,
      offset: 0,
      limit: 1,
      facets: null,
    },
  },
  {
    expected: {
      secondArg: {
        headers: {},
        params: {
          t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
          limit: '1',
        },
      },
      data: {
        version: '2021-09-15',
        data: [
          {
            jisx0402: '13101',
            old_code: '102',
            postal_code: '1020083',
            prefecture: '東京都',
            prefecture_kana: 'トウキョウト',
            city: '千代田区',
            city_kana: 'チヨダク',
            town: '麹町',
            town_kana: 'コウジマチ',
            town_raw: '麹町',
            town_kana_raw: 'コウジマチ',
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
        query: {
          q: null,
          t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
          prefecture: '東京都',
          county: null,
          city: '千代田区',
          city_ward: null,
          town: '麹町',
          kyoto_street: null,
          block_lot_num: '3-12-14',
          building: '麹町駅前ヒルトップ',
          floor_room: '8F',
        },
        count: 1,
        offset: 0,
        limit: 1,
        facets: null,
      },
    },
    options: {
      t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
      limit: 1,
    },
    response: {
      version: '2021-09-15',
      data: [
        {
          jisx0402: '13101',
          old_code: '102',
          postal_code: '1020083',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          city: '千代田区',
          city_kana: 'チヨダク',
          town: '麹町',
          town_kana: 'コウジマチ',
          town_raw: '麹町',
          town_kana_raw: 'コウジマチ',
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
      query: {
        q: null,
        t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
        prefecture: '東京都',
        county: null,
        city: '千代田区',
        city_ward: null,
        town: '麹町',
        kyoto_street: null,
        block_lot_num: '3-12-14',
        building: '麹町駅前ヒルトップ',
        floor_room: '8F',
      },
      count: 1,
      offset: 0,
      limit: 1,
      facets: null,
    },
  },
];

const searchAddressResponseV20221101 = [
  {
    expected: {
      secondArg: {
        headers: {},
        params: {
          q: '東京都 千代田区 麹町',
          limit: '1',
        },
      },
      data: {
        version: '2021-09-15',
        data: [
          {
            jisx0402: '13101',
            old_code: '102',
            postal_code: '1020083',
            prefecture: '東京都',
            prefecture_kana: 'トウキョウト',
            prefecture_roman: 'Tokyo',
            city: '千代田区',
            city_kana: 'チヨダク',
            city_roman: 'Chiyoda-ku',
            county: '',
            county_kana: '',
            county_roman: '',
            city_without_county_and_ward: '千代田区',
            city_without_county_and_ward_kana: 'チヨダク',
            city_without_county_and_ward_roman: 'Chiyoda-ku',
            city_ward: '',
            city_ward_kana: '',
            city_ward_roman: '',
            town: '麹町',
            town_kana: 'コウジマチ',
            town_roman: 'Kojimachi',
            town_raw: '麹町',
            town_kana_raw: 'コウジマチ',
            koaza: '',
            kyoto_street: '',
            building: '',
            floor: '',
            town_partial: false,
            town_chome: false,
            town_addressed_koaza: false,
            town_multi: false,
            town_jukyohyoji: false,
            update_status: 0,
            update_reason: 0,
            corporation: null,
          },
        ],
        query: {
          q: '東京都 千代田区 麹町',
          t: null,
          prefecture: '東京都',
          county: null,
          city: '千代田区',
          city_ward: null,
          town: '麹町',
          kyoto_street: null,
          block_lot_num: '3-12-14',
          building: '麹町駅前ヒルトップ',
          floor_room: '8F',
        },
        count: 1,
        offset: 0,
        limit: 1,
        facets: null,
      },
    },
    options: {
      q: '東京都 千代田区 麹町',
      limit: 1,
    },
    response: {
      version: '2021-09-15',
      data: [
        {
          jisx0402: '13101',
          old_code: '102',
          postal_code: '1020083',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          prefecture_roman: 'Tokyo',
          city: '千代田区',
          city_kana: 'チヨダク',
          city_roman: 'Chiyoda-ku',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '千代田区',
          city_without_county_and_ward_kana: 'チヨダク',
          city_without_county_and_ward_roman: 'Chiyoda-ku',
          city_ward: '',
          city_ward_kana: '',
          city_ward_roman: '',
          town: '麹町',
          town_kana: 'コウジマチ',
          town_roman: 'Kojimachi',
          town_raw: '麹町',
          town_kana_raw: 'コウジマチ',
          koaza: '',
          kyoto_street: '',
          building: '',
          floor: '',
          town_partial: false,
          town_chome: false,
          town_addressed_koaza: false,
          town_multi: false,
          town_jukyohyoji: false,
          update_status: 0,
          update_reason: 0,
          corporation: null,
        },
      ],
      query: {
        q: '東京都 千代田区 麹町',
        t: null,
        prefecture: '東京都',
        county: null,
        city: '千代田区',
        city_ward: null,
        town: '麹町',
        kyoto_street: null,
        block_lot_num: '3-12-14',
        building: '麹町駅前ヒルトップ',
        floor_room: '8F',
      },
      count: 1,
      offset: 0,
      limit: 1,
      facets: null,
    },
  },
  {
    expected: {
      secondArg: {
        headers: {},
        params: {
          t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
          limit: '1',
        },
      },
      data: {
        version: '2021-09-15',
        data: [
          {
            jisx0402: '13101',
            old_code: '102',
            postal_code: '1020083',
            prefecture: '東京都',
            prefecture_kana: 'トウキョウト',
            prefecture_roman: 'Tokyo',
            city: '千代田区',
            city_kana: 'チヨダク',
            city_roman: 'Chiyoda-ku',
            county: '',
            county_kana: '',
            county_roman: '',
            city_without_county_and_ward: '千代田区',
            city_without_county_and_ward_kana: 'チヨダク',
            city_without_county_and_ward_roman: 'Chiyoda-ku',
            city_ward: '',
            city_ward_kana: '',
            city_ward_roman: '',
            town: '麹町',
            town_kana: 'コウジマチ',
            town_roman: 'Kojimachi',
            town_raw: '麹町',
            town_kana_raw: 'コウジマチ',
            koaza: '',
            kyoto_street: '',
            building: '',
            floor: '',
            town_partial: false,
            town_chome: false,
            town_addressed_koaza: false,
            town_multi: false,
            town_jukyohyoji: false,
            update_status: 0,
            update_reason: 0,
            corporation: null,
          },
        ],
        query: {
          q: null,
          t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
          prefecture: '東京都',
          county: null,
          city: '千代田区',
          city_ward: null,
          town: '麹町',
          kyoto_street: null,
          block_lot_num: '3-12-14',
          building: '麹町駅前ヒルトップ',
          floor_room: '8F',
        },
        count: 1,
        offset: 0,
        limit: 1,
        facets: null,
      },
    },
    options: {
      t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
      limit: 1,
    },
    response: {
      version: '2021-09-15',
      data: [
        {
          jisx0402: '13101',
          old_code: '102',
          postal_code: '1020083',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          prefecture_roman: 'Tokyo',
          city: '千代田区',
          city_kana: 'チヨダク',
          city_roman: 'Chiyoda-ku',
          county: '',
          county_kana: '',
          county_roman: '',
          city_without_county_and_ward: '千代田区',
          city_without_county_and_ward_kana: 'チヨダク',
          city_without_county_and_ward_roman: 'Chiyoda-ku',
          city_ward: '',
          city_ward_kana: '',
          city_ward_roman: '',
          town: '麹町',
          town_kana: 'コウジマチ',
          town_roman: 'Kojimachi',
          town_raw: '麹町',
          town_kana_raw: 'コウジマチ',
          koaza: '',
          kyoto_street: '',
          building: '',
          floor: '',
          town_partial: false,
          town_chome: false,
          town_addressed_koaza: false,
          town_multi: false,
          town_jukyohyoji: false,
          update_status: 0,
          update_reason: 0,
          corporation: null,
        },
      ],
      query: {
        q: null,
        t: '東京都千代田区麹町三丁目12-14麹町駅前ヒルトップ8F',
        prefecture: '東京都',
        county: null,
        city: '千代田区',
        city_ward: null,
        town: '麹町',
        kyoto_street: null,
        block_lot_num: '3-12-14',
        building: '麹町駅前ヒルトップ',
        floor_room: '8F',
      },
      count: 1,
      offset: 0,
      limit: 1,
      facets: null,
    },
  },
];

test.each(searchAddressResponseV20220901)(
  'searchAddresses method with compatible mode and old API',
  async ({ expected, options, response }) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(response),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.searchAddresses(options);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: expected.secondArg.headers,
      params: expected.secondArg.params,
    });
    expect(result).toEqual(expected.data);
  }
);

test.each(searchAddressResponseV20221101)(
  'searchAddresses method with compatible mode and newer API',
  async ({ expected, options, response }) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(response),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.searchAddresses(options);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: expected.secondArg.headers,
      params: expected.secondArg.params,
    });
    expect(result).toEqual(expected.data);
  }
);

test.each(searchAddressResponseV20220901)(
  'searchAddresses method with strict mode and old API',
  async ({ expected, options, response }) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(response),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.searchAddresses(options, '2022-09-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        ...expected.secondArg.headers,
        'KenAll-API-Version': '2022-09-01',
      },
      params: expected.secondArg.params,
    });
    expect(result).toEqual(expected.data);
  }
);

test.each(searchAddressResponseV20221101)(
  'searchAddresses method with strict mode and newer API',
  async ({ expected, options, response }) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(response),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.searchAddresses(options, '2022-11-01');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./postalcode/');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {
        ...expected.secondArg.headers,
        'KenAll-API-Version': '2022-11-01',
      },
      params: expected.secondArg.params,
    });
    expect(result).toEqual(expected.data);
  }
);
