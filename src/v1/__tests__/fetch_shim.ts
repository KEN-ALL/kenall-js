import type { SpiedFunction } from 'jest-mock';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';

import type {
  RequestAugmentation,
  RequestInitWithAuxiliaryOptions,
} from '../fetch_shim.js';
import { buildAugmentedFetch } from '../fetch_shim.js';

let mockedFetch: SpiedFunction<
  (
    input: RequestInfo | URL,
    init?: RequestInitWithAuxiliaryOptions
  ) => Promise<Response>
>;

expect.addEqualityTesters([
  (a, b) => {
    if (a instanceof URL) {
      if (typeof b === 'string') {
        return a.href === b;
      } else if (b instanceof URL) {
        return a.href === b.href;
      }
      return false;
    }
    if (typeof a === 'string' && b instanceof URL) {
      return a === b.href;
    }
    return undefined;
  },
]);

beforeEach(() => {
  mockedFetch = jest.spyOn(globalThis, 'fetch');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('buildAugmentedFetch', () => {
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  test.each([
    ['https://example.com/test', 'https://example.com', '/test'],
    ['https://example.com/test', 'https://example.com/non-root', '/test'],
    ['https://example.com/test', 'https://example.com/non-root/', '/test'],
    [
      'https://example.com/non-root/test',
      'https://example.com/non-root',
      './test',
    ],
    ['https://example.com/test?c=d', 'https://example.com/?a=b', '/test?c=d'],
  ])(
    'succeed with an incomplete URL and a base URL',
    (expectedURL, baseURL, input) => {
      const fetch = buildAugmentedFetch({ baseURL });
      expect(fetch).toBeInstanceOf(Function);
      mockedFetch.mockResolvedValue({
        ok: true,
      } as Response);
      expect(
        fetch(input, {
          method: 'GET',
        })
      ).resolves.toMatchObject({
        ok: true,
      });
      expect(mockedFetch.mock.calls[0][0]).toBeInstanceOf(Request);
      expect(mockedFetch.mock.calls[0][0]).toMatchObject({
        method: 'GET',
        url: expectedURL,
      });
    }
  );

  test('throw an error if the response is not ok', () => {
    const fetch = buildAugmentedFetch({
      baseURL: 'https://example.com',
      throwErrorsForNon2xx: true,
    });
    expect(fetch).toBeInstanceOf(Function);
    mockedFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);
    expect(
      fetch('https://example.com/test', {
        method: 'GET',
      })
    ).rejects.toThrow('HTTP error 404: Not Found');
  });

  test.each([
    {
      description: 'with a default header and a header provided in init',
      expected: {
        method: 'GET',
        url: 'https://example.com/test',
        headers: new Headers({ 'X-Test': 'test', 'X-Test-2': 'test' }),
      },
      augmentation: { headers: { 'X-Test': 'test' } },
      fetchArgs: [
        'https://example.com/test',
        {
          method: 'GET',
          headers: { 'X-Test-2': 'test' },
        },
      ],
    },
    {
      description:
        'with a default header (Cookie), with the same header provided in init',
      expected: {
        method: 'GET',
        url: 'https://example.com/test',
        headers: new Headers([['Cookie', 'test1; test2']]),
      },
      augmentation: { headers: { Cookie: 'test1' } },
      fetchArgs: [
        'https://example.com/test',
        {
          method: 'GET',
          headers: { Cookie: 'test2' },
        },
      ],
    },
    {
      description:
        'with a default header (Accept-Encoding), with the same header provided in init',
      expected: {
        method: 'GET',
        url: 'https://example.com/test',
        headers: new Headers([['Accept', 'test1, test2']]),
      },
      augmentation: { headers: { Accept: 'test1' } },
      fetchArgs: [
        'https://example.com/test',
        {
          method: 'GET',
          headers: { Accept: 'test2' },
        },
      ],
    },
    {
      description:
        'with a default header, Request object with a header as input',
      expected: {
        method: 'GET',
        url: 'https://example.com/test',
        headers: new Headers({ 'X-Test': 'test', 'X-Test-2': 'test' }),
      },
      augmentation: { headers: { 'X-Test': 'test' } },
      fetchArgs: [
        new Request('https://example.com/test', {
          method: 'GET',
          headers: { 'X-Test-2': 'test' },
        }),
      ],
    },
    {
      description: 'with no augmentations, init object with a parameters',
      expected: {
        method: 'GET',
        url: 'https://example.com/test?a=b%3D%F0%9F%90%99',
      },
      augmentation: {},
      fetchArgs: [
        'https://example.com/test',
        {
          method: 'GET',
          params: {
            a: 'b=🐙',
          },
        },
      ],
    },
  ] as {
    description: string;
    expected: Partial<Mutable<Request>>;
    augmentation: RequestAugmentation;
    fetchArgs: [RequestInfo | URL, RequestInitWithAuxiliaryOptions?];
  }[])('$description', ({ expected, augmentation, fetchArgs }) => {
    const fetch = buildAugmentedFetch(augmentation);
    expect(fetch).toBeInstanceOf(Function);
    mockedFetch.mockResolvedValue({
      ok: true,
    } as Response);
    expect(fetch(...fetchArgs)).resolves.toMatchObject({
      ok: true,
    });
    expect(mockedFetch.mock.calls[0][0]).toBeInstanceOf(Request);
    const actualRequest = mockedFetch.mock.calls[0][0] as Request;
    const expectedHeaders = expected.headers;
    delete expected.headers;
    const actualHeaders = actualRequest.headers;
    expect(actualRequest).toMatchObject(expected);
    if (expectedHeaders !== undefined) {
      expect([...actualHeaders.entries()]).toStrictEqual([
        ...expectedHeaders.entries(),
      ]);
    }
  });
});
