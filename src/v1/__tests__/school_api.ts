import { expect, test, vi } from 'vitest';

import { KENALL } from '..';
import { buildAugmentedFetch } from '../fetch_shim';

vi.mock('../fetch_shim.js');

const school = {
  code: 'F113110102700',
  type: 'F1',
  jurisdiction_prefecture_code: '13',
  establishment_type: 1,
  branch: 1,
  name: '東京大学',
  address_raw: '東京都文京区本郷７－３－１',
  addresses: [
    {
      postal_code: '1130033',
      jisx0402: '13105',
      prefecture: '東京都',
      prefecture_kana: 'トウキョウト',
      prefecture_roman: 'Tokyo',
      city: '文京区',
      city_kana: 'ブンキョウク',
      city_roman: 'Bunkyo-ku',
      street_number: '本郷7-3-1',
      town: '本郷',
      kyoto_street: null,
      block_lot_num: '7-3-1',
      building: null,
      floor_room: null,
    },
  ],
  established_date: '2021-01-20',
  abolished_date: null,
  school_survey_number: '0172',
  new_code: [],
};

const schoolResolverResponse = {
  version: '2024-08-28',
  data: school,
};

const schoolSearcherResponse = {
  version: '2024-08-28',
  data: [school],
  query: 'name:東京大学',
  count: 1,
  offset: 0,
  limit: 100,
  facets: {
    area: [['/東京都', 1]],
    type: [['/大学', 1]],
    establishment_type: [['/公立', 1]],
    branch: [['/本校', 1]],
  },
};

test('getSchool method', async () => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(schoolResolverResponse),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.getSchool('F113110102700');
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./school/F113110102700');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: {},
  });
  expect(result).toEqual(schoolResolverResponse);
});

test('searchSchool method', async () => {
  const mockFetch = vi.fn<ReturnType<typeof buildAugmentedFetch>>();
  vi.mocked(buildAugmentedFetch).mockReturnValue(mockFetch);
  mockFetch.mockResolvedValue({
    json: vi.fn<Response['json']>().mockResolvedValue(schoolSearcherResponse),
  } as unknown as Response);
  const ka = new KENALL('key');
  const result = await ka.searchSchool({
    q: 'name:東京大学',
    facet_area: '/東京都',
  });
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('./school/');
  expect(mockFetch.mock.calls[0][1]).toStrictEqual({
    method: 'GET',
    headers: {},
    params: { q: 'name:東京大学', facet_area: '/東京都' },
  });
  expect(result).toEqual(schoolSearcherResponse);
});
