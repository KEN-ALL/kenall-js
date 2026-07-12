import { expect, test, vi } from 'vitest';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

vi.mock('../fetch_shim.js');

// Builds a KENALL instance whose underlying fetch resolves to `fixture`,
// together with the mock so the request can be asserted on.
const mockKENALL = (fixture: unknown) => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(fixture),
  } as unknown as Response);
  return { ka: new KENALL('key'), mockFetch };
};

const expectGetRequest = (
  mockFetch: ReturnType<typeof mockKENALL>['mockFetch'],
  path: string
) => {
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe(path);
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
};

const mizuho = {
  code: '0001',
  name: 'みずほ',
  katakana: 'ミズホ',
  hiragana: 'みずほ',
  romaji: 'mizuho',
};

const tokyoBranch = {
  code: '001',
  name: '東京営業部',
  katakana: 'トウキヨウ',
  hiragana: 'とうきょう',
  romaji: 'toukiyou',
};

const marunouchiBranch = {
  code: '004',
  name: '丸の内中央',
  katakana: 'マルノウチチユウオウ',
  hiragana: 'まるのうちちゆうおう',
  romaji: 'marunouchichiyuuou',
};

const banksResponseV20230901 = [
  {
    version: '2023-10-01',
    data: [
      mizuho,
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
    data: mizuho,
  },
];

// Legacy (2023-09-01) shape: each branch code maps to a single BankBranch.
const bankBranchesResponseV20230901 = {
  version: '2023-10-01',
  data: {
    bank: mizuho,
    branches: {
      '001': tokyoBranch,
      '004': marunouchiBranch,
    },
  },
};

const bankBranchResolverResponseV20230901 = {
  version: '2023-10-01',
  data: {
    bank: mizuho,
    branch: tokyoBranch,
  },
};

// New (2025-01-01) shape: each branch code maps to an array of BankBranch,
// because a single code may now correspond to multiple branches.
const tokyoBranchAlt = {
  code: '001',
  name: '東京第二営業部',
  katakana: 'トウキヨウダイニ',
  hiragana: 'とうきょうだいに',
  romaji: 'toukiyoudaini',
};

const bankBranchesResponseV20250101 = {
  version: '2025-01-01',
  data: {
    bank: mizuho,
    branches: {
      '001': [tokyoBranch, tokyoBranchAlt],
      '004': [marunouchiBranch],
    },
  },
};

const bankBranchResolverResponseV20250101 = {
  version: '2025-01-01',
  data: {
    bank: mizuho,
    branch: [tokyoBranch, tokyoBranchAlt],
  },
};

// A branch code that maps to an empty array (no branches). The compatible
// layer has no first element to expose the scalar fields from.
const bankBranchesResponseEmptyArray = {
  version: '2025-01-01',
  data: {
    bank: mizuho,
    branches: {
      '001': [],
    },
  },
};

const bankBranchResolverResponseEmptyArray = {
  version: '2025-01-01',
  data: {
    bank: mizuho,
    branch: [],
  },
};

test('getBanks method', async () => {
  const fixture = banksResponseV20230901[0];
  const { ka, mockFetch } = mockKENALL(fixture);
  const result = await ka.getBanks();
  expectGetRequest(mockFetch, './bank');
  expect(result).toEqual(fixture);
});

test('getBank method', async () => {
  const fixture = bankResolverResponseV20230901[0];
  const { ka, mockFetch } = mockKENALL(fixture);
  const result = await ka.getBank('0001');
  expectGetRequest(mockFetch, './bank/0001');
  expect(result).toEqual(fixture);
});

test('getBankBranches method (compatible, legacy single-branch payload)', async () => {
  const { ka, mockFetch } = mockKENALL(bankBranchesResponseV20230901);
  const result = await ka.getBankBranches('0001');
  expectGetRequest(mockFetch, './bank/0001/branches');

  expect(result.version).toBe('2023-10-01');
  expect(result.data.bank).toEqual(mizuho);
  // The compatible layer normalizes each single branch into a hybrid that
  // works both as an array and as the original single object.
  const branch = result.data.branches['001'];
  expect(Array.isArray(branch)).toBe(true);
  expect(branch).toHaveLength(1);
  expect(branch[0]).toEqual(tokyoBranch);
  expect(branch.code).toBe('001');
  expect(branch.name).toBe('東京営業部');
});

test('getBankBranches method (compatible, new array payload)', async () => {
  const { ka, mockFetch } = mockKENALL(bankBranchesResponseV20250101);
  const result = await ka.getBankBranches('0001');
  expectGetRequest(mockFetch, './bank/0001/branches');

  expect(result.version).toBe('2025-01-01');
  const branch = result.data.branches['001'];
  // Array payloads are preserved as arrays, while the first element's fields
  // are also exposed on the hybrid for legacy single-object access.
  expect(Array.isArray(branch)).toBe(true);
  expect(branch).toHaveLength(2);
  expect(branch[0]).toEqual(tokyoBranch);
  expect(branch[1]).toEqual(tokyoBranchAlt);
  expect(branch.code).toBe('001');
  expect(branch.name).toBe('東京営業部');

  const single = result.data.branches['004'];
  expect(single).toHaveLength(1);
  expect(single[0]).toEqual(marunouchiBranch);
});

test('getBankBranches method (compatible, empty branch array)', async () => {
  const { ka } = mockKENALL(bankBranchesResponseEmptyArray);
  const result = await ka.getBankBranches('0001');

  // An empty array stays an empty array; there is no first element, so the
  // scalar (legacy) fields are absent rather than fabricated.
  const branch = result.data.branches['001'];
  expect(Array.isArray(branch)).toBe(true);
  expect(branch).toHaveLength(0);
  expect(branch.code).toBeUndefined();
});

test('getBankBranches method (version-pinned payloads pass through unchanged)', async () => {
  {
    const { ka } = mockKENALL(bankBranchesResponseV20230901);
    const result = await ka.getBankBranches('0001', '2023-09-01');
    expect(result).toEqual(bankBranchesResponseV20230901);
  }
  {
    const { ka } = mockKENALL(bankBranchesResponseV20250101);
    const result = await ka.getBankBranches('0001', '2025-01-01');
    expect(result).toEqual(bankBranchesResponseV20250101);
  }
});

test('getBankBranch method (compatible, legacy single-branch payload)', async () => {
  const { ka, mockFetch } = mockKENALL(bankBranchResolverResponseV20230901);
  const result = await ka.getBankBranch('0001', '001');
  expectGetRequest(mockFetch, './bank/0001/branches/001');

  expect(result.version).toBe('2023-10-01');
  expect(result.data.bank).toEqual(mizuho);
  const branch = result.data.branch;
  expect(Array.isArray(branch)).toBe(true);
  expect(branch).toHaveLength(1);
  expect(branch[0]).toEqual(tokyoBranch);
  expect(branch.code).toBe('001');
  expect(branch.name).toBe('東京営業部');
});

test('getBankBranch method (compatible, new array payload)', async () => {
  const { ka, mockFetch } = mockKENALL(bankBranchResolverResponseV20250101);
  const result = await ka.getBankBranch('0001', '001');
  expectGetRequest(mockFetch, './bank/0001/branches/001');

  expect(result.version).toBe('2025-01-01');
  const branch = result.data.branch;
  expect(Array.isArray(branch)).toBe(true);
  expect(branch).toHaveLength(2);
  expect(branch[0]).toEqual(tokyoBranch);
  expect(branch[1]).toEqual(tokyoBranchAlt);
  expect(branch.code).toBe('001');
  expect(branch.name).toBe('東京営業部');
});

test('getBankBranch method (compatible, empty branch array)', async () => {
  const { ka } = mockKENALL(bankBranchResolverResponseEmptyArray);
  const result = await ka.getBankBranch('0001', '001');

  const branch = result.data.branch;
  expect(Array.isArray(branch)).toBe(true);
  expect(branch).toHaveLength(0);
  expect(branch.code).toBeUndefined();
});

test('getBankBranch method (version-pinned payloads pass through unchanged)', async () => {
  {
    const { ka } = mockKENALL(bankBranchResolverResponseV20230901);
    const result = await ka.getBankBranch('0001', '001', '2023-09-01');
    expect(result).toEqual(bankBranchResolverResponseV20230901);
  }
  {
    const { ka } = mockKENALL(bankBranchResolverResponseV20250101);
    const result = await ka.getBankBranch('0001', '001', '2025-01-01');
    expect(result).toEqual(bankBranchResolverResponseV20250101);
  }
});
