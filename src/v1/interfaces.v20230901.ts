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

/**
 * A `Bank` object would store the information about the bank.
 */
export interface Bank {
  /**
   * The code of bank.
   *
   * Example: `"0001"`
   */
  code: string;

  /**
   * The name of bank.
   *
   * Example: `"みずほ"`
   */
  name: string;

  /**
   * The reading of the name of bank in katakana.
   *
   * Example: `"ミズホ"`
   */
  katakana: string;

  /**
   * The reading of the name of bank in hiragana.
   *
   * Example: `"みずほ"`
   */
  hiragana: string;

  /**
   * The "romanized" reading of the name of bank.
   *
   * Example : `"mizuho"`
   */
  romaji: string;
}

/**
 * A `BankBranch` object would store the information about the bank branch.
 */
export interface BankBranch {
  /**
   * The code of bank branch.
   *
   * Example: `"188"`
   */
  code: string;

  /**
   * The name of bank branch.
   *
   * Example: `"恵比寿"`
   */
  name: string;

  /**
   * The reading of the name of bank branch in katakana.
   *
   * Example: `"エビス"`
   */
  katakana: string;

  /**
   * The reading of the name of bank branch in hiragana.
   *
   * Example: `"えびす"`
   */
  hiragana: string;

  /**
   * The "romanized" reading of the name of bank branch.
   *
   * Example : `"ebisu"`
   */
  romaji: string;
}

/**
 * An `BanksResponse` describes a response to
 * "getBanks" API call.
 */
export interface BanksResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The set of the bank data.
   */
  data: Bank[];
}

/**
 * An `BankResolverResponse` describes a response to
 * "getBank" API call.
 */
export interface BankResolverResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The bank data.
   */
  data: Bank;
}

/**
 * An `BankBranchesResponse` describes a response to
 * "getBankBranches" API call.
 * The response includes the bank and the branch data.
 * The bank data is the same as the `BankResolverResponse`.
 */
export interface BankBranchesResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The bank and branch data.
   * The branches key is the bank branch code.
   */
  data: {
    bank: Bank;
    branches: {
      [key: string]: BankBranch;
    };
  };
}

/**
 * An `BankBranchResolverResponse` describes a response to
 * "getBankBranch" API call.
 * The response includes the bank and the branch data.
 * The bank data is the same as the `BankResolverResponse`.
 * The branch data is the same as the one in `BankBranchesResponse`.
 */
export interface BankBranchResolverResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The bank and branch data.
   */
  data: {
    bank: Bank;
    branch: BankBranch;
  };
}
