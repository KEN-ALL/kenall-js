import * as v20221101 from './interfaces.v20221101';

export type UpdateStatus = v20221101.UpdateStatus;
export type UpdateReason = v20221101.UpdateReason;
export type Facet = v20221101.Facet;
export type AddressSearcherQuery = v20221101.AddressSearcherQuery;
export type AddressSearcherOptions = v20221101.AddressSearcherOptions;
export type NTACorporateInfoProcess = v20221101.NTACorporateInfoProcess;
export type NTACorporateInfoKind = v20221101.NTACorporateInfoKind;
export type NTACorporateInfoCloseCause = v20221101.NTACorporateInfoCloseCause;
export type NTACorporateInfo = v20221101.NTACorporateInfo;
export type NTACorporateInfoResolverResponse =
  v20221101.NTACorporateInfoResolverResponse;
export type NTACorporateInfoSearchMode = v20221101.NTACorporateInfoSearchMode;
export type NTACorporateInfoSearcherOptions =
  v20221101.NTACorporateInfoSearcherOptions;
export type NTACorporateInfoFacets = v20221101.NTACorporateInfoFacets;
export type NTACorporateInfoSearcherResponse =
  v20221101.NTACorporateInfoSearcherResponse;

/**
 * A `Corporation` object would store the information about the organization,
 * or the division of a organization, which has its special postal code designated.
 */
export interface Corporation extends v20221101.Corporation {
  /**
   * A catch-all property
   */
  [key: string]: any;
}

/**
 * A `Address` object would store the information about the resolved area, place, or organization.
 */
export interface Address {
  /**
   * The 5 digit Japanese municipality code (全国地方公共団体コード)
   * for the administrative division where the place this object represents
   * belongs.
   */
  jisx0402: string;

  /**
   * The "old" postal code that was used before February 2, 1998.
   */
  old_code: string;

  /**
   * The postal code for the place this object represents.
   */
  postal_code: string;

  /**
   * The name of the prefecture in Kanji.

   * Example: `"東京都"`
   */
  prefecture: string;

  /**
   * The reading of the name of the prefecture in katakana.
   *
   * Example: `"トウキョウト"`
   */
  prefecture_kana: string;

  /**
   * The "romanized" reading of the name of the prefecture.
   *
   * Example: `"Tokyo"`
   */
  prefecture_roman?: string;

  /**
   * The name of the city.
   * The county name may precede it, or the name of the
   * ward would follow it in case the city has ordinance-designated wards.
   *
   * Examples:
   *
   * * `"港区"`
   * * `"大阪市北区"`
   * * `"各務原市"`
   * * `"秩父郡長瀞町"`
   */
  city: string;

  /**
   * The reading of the name of the city in katakana.
   *
   * Examples:
   *
   * * `"ミナトク"`
   * * `"オオサカシキタク"`
   * * `"カカミガハラシ"`
   * * `"チチブグンナガトロマチ"`
   * "`
   */
  city_kana: string;

  /**
   * The "romanized" reading of the name of the city.
   *
   * Examples:
   *
   * * `"Minato-ku"`
   * * `"Kita-ku, Osaka"`
   * * `"Kakamigahara"`
   * * `"Nagatoro, Chichibu"`
   */
  city_roman?: string;

  /**
   * The name of the county.
   *
   * Examples:
   *
   * * `"秩父郡"`
   */
  county?: string;

  /**
   * The reading of the name of the county in katakana.
   *
   * Examples:
   *
   * * `"チチブグン"`
   * "`
   */
  county_kana?: string;

  /**
   * The "romanized" reading of the name of the county.
   *
   * Examples:
   *
   * * `"Chichibu"`
   */
  county_roman?: string;

  /**
   * The name of the city, with the county and ordinance-designated ward part removed.
   *
   * Examples:
   *
   * * `"港区"`
   * * `"大阪市"`
   * * `"各務原市"`
   * * `"長瀞町"`
   */
  city_without_county_and_ward?: string;

  /**
   * The reading of the name of the city, with the county and ordinance-designated ward
   * part removed.
   *
   * Examples:
   *
   * * `"ミナトク"`
   * * `"オオサカシ"`
   * * `"カカミガハラシ"`
   * * `"ナガトロマチ"`
   */
  city_without_county_and_ward_kana?: string;

  /**
   * The "romanized" reading of the name of the city, with the county and
   * ordinance-designated ward part removed.
   *
   * Examples:
   *
   * * `"Minato-ku"`
   * * `"Osaka"`
   * * `"Kakamigahara"`
   * * `"Nagatoro"`
   */
  city_without_county_and_ward_roman?: string;

  /**
   * The name of the ordinance-designated ward, if applicable.
   *
   * Examples:
   *
   * * `"千種区"`
   */
  city_ward?: string;

  /**
   * The reading of the name of the ordinance-designated ward in katakana.
   *
   * Examples:
   *
   * * `"チクサク"`
   */
  city_ward_kana?: string;

  /**
   * The "romanized" reading of the name of the city.
   *
   * Examples:
   *
   * * `"Chikusa-ku"`
   */
  city_ward_roman?: string;

  /**
   * The name of the area that usually corresponds to lowest part of the
   * administrative division levels ("town").
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"箱石"`
   * * `"晴海"`
   * * `"西北小路町"`
   */
  town: string;

  /**
   * The reading of the name of the town.
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"ハコイシ"`
   * * `"ハルミ"`
   * * `"ニシキタコウジチョウ"`
   */
  town_kana: string;

  /**
   * The "romanized" reading of the name of the town.
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"Hakoishi"`
   * * `"Harumi"`
   * * `"Nishikitakojicho"`
   */
  town_roman?: string;

  /**
   * The unprocessed value(s) of the name of the area. It may consist of
   * multiple (non-administrative) sub-areas.
   *
   * Note that they don't always represent the actual name of the area,
   * in case they are expediently designated by Japan Post.
   *
   * Examples:
   *
   * * `"岩手県宮古市箱石（第２地割「７０〜１３６」〜第４地割「３〜１１」）"`
   * * `"西北小路町（猪熊通上立売上る、猪熊通寺之内下る、大宮通寺之内下る東入、大宮通寺之内半丁下る東入、大宮通寺之内下る東入１丁目、寺之内通大宮東入下る、寺之内通大宮東入１丁目下る）"`
   * * `"晴海　オフィスタワーＸ　１階"`
   */
  town_raw: string;

  /**
   * The reading of the unprocessed value(s) of the name of the area.
   *
   * Examples:
   *
   * * `"イワテケンミヤコシハコイシ(ダイ2チワリ<70-136>-ダイ4チワリ<3-11>)"`
   * * `"ニシキタコウジチョウ"`
   * * `"トウキョウトチユウオウクハルミ　オフイスタワーX　1カイ"`
   */
  town_kana_raw: string;

  /**
   * The name of the (non-administrative) sub-area of the town.
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"第２地割"`
   * * `"１丁目"`
   */
  koaza: string;

  /**
   * The instructional phrase (通り名 in Japanese) very specific to Kyoto city,
   * which helps one to locate the place out of the area of the town.
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"先斗町通蛸薬師上る"`
   * * `"大宮通寺之内半丁下る東入"`
   */
  kyoto_street: string | null;

  /**
   * The name of the building, in case the postal code is designated to a building,
   * or its each floor.
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"オフィスタワーＸ"`
   */
  building: string;

  /**
   * The floor of the building.
   *
   * This is a synthetic value; that means it resulted from our original
   * interpretation of the `town_raw` data, and the corresponding value might
   * well not be present in the original KEN_ALL data provided by Japan Post.
   *
   * Examples:
   *
   * * `"１階"`
   */
  floor: string;

  /**
   * For the detail of the meaning of this property, See the API documentation.
   * The value has no use; we recommend not referring to this.
   */
  town_partial: boolean;

  /**
   * For the detail of the meaning of this property, See the API documentation.
   * The value has no use; we recommend not referring to this.
   */
  town_addressed_koaza: boolean;

  /**
   * For the detail of the meaning of this property, See the API documentation.
   * The value has no use; we recommend not referring to this.
   */
  town_multi: boolean;

  /**
   * For the detail of the meaning of this property, See the API documentation.
   * The value has no use; we recommend not referring to this.
   */
  town_chome: boolean;

  /**
   * The flag that indicates if the area corresponding to the postal code
   * is designated as building-based addressing area (住居表示実施地区).
   */
  town_jukyohyoji?: boolean;

  /**
   * The value that indicates if the record is updated or deleted for this version.
   */
  update_status?: UpdateStatus;

  /**
   * The value that represents the reason how the record is changed, when
   * `update_status` is set to non-zero value.
   */
  update_reason?: UpdateReason;

  /**
   * If the postal code is designated to an organization, or a division of such,
   * this property stores the `Corporation` object that describes it.
   */
  corporation: Corporation | null;

  /**
   * A catch-all property
   */
  [key: string]: any;
}

/**
 * An `AddressResolverResponse` describes a response to
 * "getAddress" API call.
 */
export interface AddressResolverResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The set of the data that match to the query.
   */
  data: Address[];
}

/**
 * An `AddressSearcherResponse` describes a response to
 * "searchAddresses" API call.
 */
export interface AddressSearcherResponse extends AddressResolverResponse {
  /**
   * The query that the search has been performed for.
   */
  query: AddressSearcherQuery;

  /**
   * The number of the resulting items in total.
   */
  count: number;

  /**
   * The offset from which the result has been retrieved.
   */
  offset: number;

  /**
   * The number of items that have been intended, at most, to retrieve from the result.
   */
  limit: number;

  /**
   * The facets of the result that form with the query.
   *
   * If no facet is given, those will be unavailable and this stores null.
   */
  facets: Facet[] | null;
}

/**
 * A `City` object would store the information about the resolved area.
 */
export interface City {
  /**
   * The 5 digit Japanese municipality code (全国地方公共団体コード)
   * for the administrative division this object represents.
   */
  jisx0402: string;

  /**
   * The prefecture code defined in JISX0401.
   *
   * Example: `"13"`
   */
  prefecture_code: string;

  /**
   * The name of the prefecture in Kanji.
   *
   * Example: `"東京都"`
   */
  prefecture: string;

  /**
   * The reading of the name of the prefecture in katakana.
   *
   * Example: `"トウキョウト"`
   */
  prefecture_kana: string;

  /**
   * The "romanized" reading of the name of the prefecture.
   *
   * Example: `"Tokyo"`
   */
  prefecture_roman?: string;

  /**
   * The remaining portion of the JISX0402 code that has the leading two-dight prefecture code removed.
   *
   * Example: `"113"`
   */
  city_code: string;

  /**
   * The name of the city.
   * The county name may precede it, or the name of the
   * ward would follow it in case the city has ordinance-designated wards.
   *
   * Examples:
   *
   * * `"港区"`
   * * `"大阪市北区"`
   * * `"各務原市"`
   * * `"秩父郡長瀞町"`
   */
  city: string;

  /**
   * The reading of the name of the city in katakana.
   *
   * Examples:
   *
   * * `"ミナトク"`
   * * `"オオサカシキタク"`
   * * `"カカミガハラシ"`
   * * `"チチブグンナガトロマチ"`
   */
  city_kana: string;

  /**
   * The "romanized" reading of the name of the city.
   *
   * Examples:
   *
   * * `"Minato-ku"`
   * * `"Kita-ku, Osaka"`
   * * `"Kakamigahara"`
   * * `"Nagatoro, Chichibu"`
   */
  city_roman?: string;

  /**
   * A catch-all property
   */
  [key: string]: any;
}

/**
 * A `CityResolverResponse` describes a response to "getCities" API call.
 */
export interface CityResolverResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The set of the data that match to the query.
   */
  data: City[];
}
