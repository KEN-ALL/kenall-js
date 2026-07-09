import { expect, test, vi } from 'vitest';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

vi.mock('../fetch_shim.js');

const whoamiResponse = [
  {
    remote_addr: {
      type: 'v4',
      address: '192.0.2.1',
    },
  },
];

test.each(whoamiResponse)('whoami method', async (fixture) => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(fixture),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.whoami();
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./whoami');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
  expect(result).toEqual(fixture);
});
