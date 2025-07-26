import { expect, jest, test } from '@jest/globals';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

jest.mock('../fetch_shim.js');

const banksResponseV20230901 = [
  {
    version: '2023-10-01',
    data: [
      {
        code: '0001',
        name: 'みずほ',
        katakana: 'ミズホ',
        hiragana: 'みずほ',
        romaji: 'mizuho',
      },
      {
        code: '0005',
        name: '三菱UFJ',
        katakana: 'ミツビシユーエフジェイ',
        hiragana: 'みつびしゆーえふじぇい',
        romaji: 'mitsubishiyuーefujiei',
      },
    ],
  },
];

const bankResolverResponseV20230901 = [
  {
    version: '2023-10-01',
    data: {
      code: '0001',
      name: 'みずほ',
      katakana: 'ミズホ',
      hiragana: 'みずほ',
      romaji: 'mizuho',
    },
  },
];

const bankBranchesResponseV20230901 = [
  {
    version: '2023-10-01',
    data: {
      bank: {
        code: '0001',
        name: 'みずほ',
        katakana: 'ミズホ',
        hiragana: 'みずほ',
        romaji: 'mizuho',
      },
      branches: {
        '001': {
          code: '001',
          name: '東京営業部',
          katakana: 'トウキヨウ',
          hiragana: 'とうきょう',
          romaji: 'toukiyou',
        },
        '004': {
          code: '004',
          name: '丸の内中央',
          katakana: 'マルノウチチユウオウ',
          hiragana: 'まるのうちちゆうおう',
          romaji: 'marunouchichiyuuou',
        },
      },
    },
  },
];

const bankBranchResolverResponseV20230901 = [
  {
    version: '2023-10-01',
    data: {
      bank: {
        code: '0001',
        name: 'みずほ',
        katakana: 'ミズホ',
        hiragana: 'みずほ',
        romaji: 'mizuho',
      },
      branch: {
        code: '001',
        name: '東京営業部',
        katakana: 'トウキヨウ',
        hiragana: 'とうきょう',
        romaji: 'toukiyou',
      },
    },
  },
];

test.each(banksResponseV20230901)('getBanks method', async (fixture) => {
  const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
  jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: jest.fn<Response['json']>().mockResolvedValue(fixture),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.getBanks();
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./bank');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
  expect(result).toEqual(fixture);
});

test.each(bankResolverResponseV20230901)('getBank method', async (fixture) => {
  const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
  jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: jest.fn<Response['json']>().mockResolvedValue(fixture),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.getBank('0001');
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./bank/0001');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
  expect(result).toEqual(fixture);
});

test.each(bankBranchesResponseV20230901)(
  'getBankBranches method',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getBankBranches('0001');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./bank/0001/branches');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);

test.each(bankBranchResolverResponseV20230901)(
  'getBankBranch method',
  async (fixture) => {
    const mockFetch = jest.fn<ReturnType<typeof buildAugmentedFetch>>();
    jest.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
    mockFetch.mockResolvedValue({
      json: jest.fn<Response['json']>().mockResolvedValue(fixture),
    } as unknown as Response);
    const ka = new KENALL('key');
    const result = await ka.getBankBranch('0001', '001');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('./bank/0001/branches/001');
    expect(mockFetch.mock.calls[0][1]).toStrictEqual({
      method: 'GET',
      headers: {},
      params: {},
    });
    expect(result).toEqual(fixture);
  }
);
