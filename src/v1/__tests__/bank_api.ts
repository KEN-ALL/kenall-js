import { mocked } from 'jest-mock';
import { KENALL } from '..';
import { AxiosInstance } from 'axios';
import axios from 'axios';

jest.mock('axios');

const banksResponseV20240101 = [
  {
    version: '2024-01-01',
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

const bankResolverResponseV20240101 = [
  {
    version: '2024-01-01',
    data: {
      code: '0001',
      name: 'みずほ',
      katakana: 'ミズホ',
      hiragana: 'みずほ',
      romaji: 'mizuho',
    },
  },
];

const bankBranchesResponseV20240101 = [
  {
    version: '2024-01-01',
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

const bankBranchResolverResponseV20240101 = [
  {
    version: '2024-01-01',
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

test.each(banksResponseV20240101)('getBanks method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
  mockedAxiosGet.mockResolvedValue({ data: fixture });
  const ka = new KENALL('key');
  const result = await ka.getBanks();
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/bank');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    headers: {},
    params: {
      version: undefined,
    },
  });
  expect(result).toEqual(fixture);
});

test.each(bankResolverResponseV20240101)('getBank method', async (fixture) => {
  const mockedAxiosGet = jest.fn();
  mocked(axios).create = jest.fn((...args): AxiosInstance => {
    const retval = jest.requireActual('axios').create(...args);
    retval.get = mockedAxiosGet;
    return retval;
  });
  mockedAxiosGet.mockResolvedValue({ data: fixture });
  const ka = new KENALL('key');
  const result = await ka.getBank('0001');
  expect(mockedAxiosGet.mock.calls).toHaveLength(1);
  expect(mockedAxiosGet.mock.calls[0][0]).toBe('/bank/0001');
  expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
    headers: {},
    params: {
      version: undefined,
    },
  });
  expect(result).toEqual(fixture);
});

test.each(bankBranchesResponseV20240101)(
  'getBankBranches method',
  async (fixture) => {
    const mockedAxiosGet = jest.fn();
    mocked(axios).create = jest.fn((...args): AxiosInstance => {
      const retval = jest.requireActual('axios').create(...args);
      retval.get = mockedAxiosGet;
      return retval;
    });
    mockedAxiosGet.mockResolvedValue({ data: fixture });
    const ka = new KENALL('key');
    const result = await ka.getBankBranches('0001');
    expect(mockedAxiosGet.mock.calls).toHaveLength(1);
    expect(mockedAxiosGet.mock.calls[0][0]).toBe('/bank/0001/branches');
    expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
      headers: {},
      params: {
        version: undefined,
      },
    });
    expect(result).toEqual(fixture);
  }
);

test.each(bankBranchResolverResponseV20240101)(
  'getBankBranch method',
  async (fixture) => {
    const mockedAxiosGet = jest.fn();
    mocked(axios).create = jest.fn((...args): AxiosInstance => {
      const retval = jest.requireActual('axios').create(...args);
      retval.get = mockedAxiosGet;
      return retval;
    });
    mockedAxiosGet.mockResolvedValue({ data: fixture });
    const ka = new KENALL('key');
    const result = await ka.getBankBranch('0001', '001');
    expect(mockedAxiosGet.mock.calls).toHaveLength(1);
    expect(mockedAxiosGet.mock.calls[0][0]).toBe('/bank/0001/branches/001');
    expect(mockedAxiosGet.mock.calls[0][1]).toEqual({
      headers: {},
      params: {
        version: undefined,
      },
    });
    expect(result).toEqual(fixture);
  }
);
