export interface Address {
  jisx0402: string;
  old_code: string;
  postal_code: string;
  prefecture: string;
  prefecture_kana: string;
  city: string;
  city_kana: string;
  town: string;
  town_kana: string;
  town_raw: string;
  town_kana_raw: string;
  koaza: string;
  kyoto_street: string;
  building: string;
  floor: string;
  town_partial: boolean;
  town_addressed_koaza: boolean;
  town_multi: boolean;
  town_chome: boolean;
  corporation: Corporation | null;
}

export interface Corporation {
  name: string;
  name_kana: string;
  block_lot: string;
  post_office: string;
  code_type: number;
}

export interface AddressResolverResponse {
  version: string;
  data: Address[];
}

export type Facet = [string, number];

export interface AddressSearcherResponse extends AddressResolverResponse {
  query: string;
  count: number;
  offset: number;
  limit: number;
  facets: Facet[] | null;
}

export type AddressSearcherOptions = {
  query: string | undefined;
  offset?: number | undefined;
  limit?: number | undefined;
  version?: string | undefined;
};

export interface City {
  jisx0402: string;
  prefecture_code: string;
  prefecture: string;
  prefecture_kana: string;
  city_code: string;
  city: string;
  city_kana: string;
}

export interface CityResolverResponse {
  version: string;
  data: City[];
}
