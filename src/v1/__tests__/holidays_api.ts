import { expect, test, vi } from 'vitest';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

vi.mock('../fetch_shim.js');

const holidaysResponse = {
  data: [
    {
      title: '元日',
      date: '2022-01-01',
      day_of_week: 6,
      day_of_week_text: 'saturday',
    },
    {
      title: '成人の日',
      date: '2022-01-10',
      day_of_week: 1,
      day_of_week_text: 'monday',
    },
  ],
};

test('getHolidays method with year', async () => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(holidaysResponse),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.getHolidays({ year: 2026 });
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./holidays');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: { year: '2026' },
  });
  expect(result).toEqual(holidaysResponse);
});

test('getHolidays method with from/to', async () => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(holidaysResponse),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.getHolidays({
    from: '2000-01-01',
    to: '2001-02-01',
  });
  expect(mockFetch.mock.calls[0][0]).toBe('./holidays');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: { from: '2000-01-01', to: '2001-02-01' },
  });
  expect(result).toEqual(holidaysResponse);
});

test('getHolidays method without arguments', async () => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(holidaysResponse),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.getHolidays();
  expect(mockFetch.mock.calls[0][0]).toBe('./holidays');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
  expect(result).toEqual(holidaysResponse);
});
