import { expect, jest, test } from '@jest/globals';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

jest.mock('../fetch_shim.js');

test.each([
  {
    response: {
      version: '2024-02-02',
      data: {
        published_date: '2024-01-31',
        sequence_number: 105653,
        qualified_invoice_issuer_number: 'T2021001052596',
        process: 1,
        correct: 0,
        kind: 2,
        country: 1,
        latest: 1,
        registration_date: '2023-10-01',
        update_date: '2022-03-02',
        disposal_date: null,
        expire_date: null,
        address: {
          postal_code: null,
          jisx0402: '13101',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          prefecture_roman: 'Tokyo',
          city: '千代田区',
          city_kana: 'チヨダク',
          city_roman: 'Chiyoda-ku',
          street_number: '麹町３丁目１２－１４麹町駅前ヒルトップ８階',
          town: '麹町',
          kyoto_street: null,
          block_lot_num: '3-12-14',
          building: '麹町駅前ヒルトップ',
          floor_room: '8階',
        },
        address_request: {
          postal_code: null,
          jisx0402: null,
          prefecture: null,
          prefecture_kana: null,
          prefecture_roman: null,
          city: '',
          city_kana: '',
          city_roman: '',
          street_number: '',
          town: null,
          kyoto_street: null,
          block_lot_num: null,
          building: null,
          floor_room: null,
        },
        address_inside: {
          postal_code: null,
          jisx0402: null,
          prefecture: null,
          prefecture_kana: null,
          prefecture_roman: null,
          city: '',
          city_kana: '',
          city_roman: '',
          street_number: '',
          town: null,
          kyoto_street: null,
          block_lot_num: null,
          building: null,
          floor_room: null,
        },
        kana: '',
        name: '株式会社オープンコレクター',
        trade_name: '',
        popular_name_previous_name: '',
      },
    },
    expected: {
      version: '2024-02-02',
      data: {
        published_date: '2024-01-31',
        sequence_number: 105653,
        qualified_invoice_issuer_number: 'T2021001052596',
        process: 1,
        correct: 0,
        kind: 2,
        country: 1,
        latest: 1,
        registration_date: '2023-10-01',
        update_date: '2022-03-02',
        disposal_date: null,
        expire_date: null,
        address: {
          postal_code: null,
          jisx0402: '13101',
          prefecture: '東京都',
          prefecture_kana: 'トウキョウト',
          prefecture_roman: 'Tokyo',
          city: '千代田区',
          city_kana: 'チヨダク',
          city_roman: 'Chiyoda-ku',
          street_number: '麹町３丁目１２－１４麹町駅前ヒルトップ８階',
          town: '麹町',
          kyoto_street: null,
          block_lot_num: '3-12-14',
          building: '麹町駅前ヒルトップ',
          floor_room: '8階',
        },
        address_request: {
          postal_code: null,
          jisx0402: null,
          prefecture: null,
          prefecture_kana: null,
          prefecture_roman: null,
          city: '',
          city_kana: '',
          city_roman: '',
          street_number: '',
          town: null,
          kyoto_street: null,
          block_lot_num: null,
          building: null,
          floor_room: null,
        },
        address_inside: {
          postal_code: null,
          jisx0402: null,
          prefecture: null,
          prefecture_kana: null,
          prefecture_roman: null,
          city: '',
          city_kana: '',
          city_roman: '',
          street_number: '',
          town: null,
          kyoto_street: null,
          block_lot_num: null,
          building: null,
          floor_room: null,
        },
        kana: '',
        name: '株式会社オープンコレクター',
        trade_name: '',
        popular_name_previous_name: '',
      },
    },
  },
])(
  'getNTAQualifiedInvoiceIssuerInfoResolver method',
  async ({ response, expected }) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(response),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getNTAQualifiedInvoiceIssuerInfo('T0000000000000');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./invoice/T0000000000000');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(expected);
  }
);
