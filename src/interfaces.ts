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
  name_kane: string;
  block_lot: string;
  post_office: string;
  code_type: number;
}

export interface AddressResolverResponse {
  version: string;
  data: Address[];
}
