import { expect, test, vi } from 'vitest';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

vi.mock('../fetch_shim.js');

const businessDayCheckResponse = [{ result: false }, { result: true }];

test.each(
  businessDayCheckResponse
)('checkBusinessDay method', async (fixture) => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(fixture),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.checkBusinessDay('2026-01-01');
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./businessdays/check');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: { date: '2026-01-01' },
  });
  expect(result).toEqual(fixture);
});
