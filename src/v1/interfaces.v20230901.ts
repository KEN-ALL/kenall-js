import * as v20221101 from './interfaces.v20221101';

export type Corporation = v20221101.Corporation;
export type Facet = v20221101.Facet;
export type UpdateStatus = v20221101.UpdateStatus;
export type UpdateReason = v20221101.UpdateReason;
export type Address = v20221101.Address;
export type AddressResolverResponse = v20221101.AddressResolverResponse;
export type AddressSearcherQuery = v20221101.AddressSearcherQuery;
export type AddressSearcherOptions = v20221101.AddressSearcherOptions;
export type AddressSearcherResponse = v20221101.AddressSearcherResponse;
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
  prefecture_roman: string;

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
  city_roman: string;

  /**
   * The name of the county, if any. This should be contained as part of the city name.
   *
   * Examples:
   *
   * * `"秩父郡"`
   * * `"西多摩郡"`
   * * `"薩摩郡"`
   * * `"東松浦郡"`
   */
  county: string;

  /**
   * The reading name of the county in katakana, if any. This should be contained as part of the reading name of the city.
   *
   * Examples:
   *
   * * `"チチブグン"`
   * * `"ニシタマグン"`
   * * `"サツマグン"`
   * * `"ヒガシマツウラグン"`
   */
  county_kana: string;

  /**
   * The "romanized" reading name of the county, if any. This should be contained as part of the reading name of the city.
   *
   * Examples:
   *
   * * `"Chichibu"`
   * * `"Nishitama"`
   * * `"Satsuma"`
   * * `"Higashimatsura"`
   */
  county_roman: string;

  /**
   * The name of the city, excluding the county and ward part.
   *
   * Examples:
   *
   * * `"大阪市"`
   * * `"長瀞町"`
   * * `"横浜市"`
   */
  city_without_county_and_ward: string;

  /**
   * The reading name of the city in katakana, excluding the county and ward part.
   *
   * * `"オオサカシ"`
   * * `"ナガトロマチ"`
   * * `"ヨコハマシ"`
   */
  city_without_county_and_ward_kana: string;

  /**
   * The "romanized" reading name of the city, excluding the county and ward part.
   *
   * * `"Osaka"`
   * * `"Nagatoro"`
   * * `"Yokohama"`
   */
  city_without_county_and_ward_roman: string;
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
