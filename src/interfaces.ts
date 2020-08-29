interface Postalcode {
  postalcode: string;
  prefecture: string;
  city: string;
  town: string;
  prefecture_kana: string;
  city_kana: string;
  town_kana: string;
  town_partial: number;
  town_koazabanchi: number;
  town_multi: number;
  town_chome: number;
}

interface PostalcodeResponse {
  version: string;
  data: Postalcode[];
}
