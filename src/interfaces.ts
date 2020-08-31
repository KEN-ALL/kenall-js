export interface Address {
  postalcode: string;
  prefecture: string;
  city: string;
  town: string;
  prefecture_kana: string;
  city_kana: string;
  town_kana: string;
  town_partial: boolean;
  town_koazabanchi: boolean;
  town_multi: boolean;
  town_chome: boolean;
}

export interface AddressResolverResponse {
  version: string;
  data: Address[];
}