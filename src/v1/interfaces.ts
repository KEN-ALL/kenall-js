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
   * The reading for the name of the prefecture in katakana.
   *
   * Example: `"トウキョウト"`
   */
  prefecture_kana: string;

  /**
   * The name of the city.
   * The county name may precede it, or to the contrary, the name of the
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
   * The reading for the name of the city in katakana.
   *
   * Examples:
   *
   * * `"ミナトク"`
   * * `"オオサカシキタク"`
   * * `"カガミハラシ"`
   * * `"チチブグンナガトロチョウ"`
   */
  city_kana: string;

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
   * * `箱石`
   * * `晴海`
   * * `西北小路町`
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
   * * `ハコイシ`
   * * `ハルミ`
   * * `ニシキタコウジチョウ`
   */
  town_kana: string;

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
   * The reading for the unprocessed value(s) of the name of the area.
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
   * The instructional phrase (通り名 in Japanese that signifies the (non-administrative)
   * sub-area of the town, the way which describe is very specific to a district of
   * Kyoto city.
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
  kyoto_street: string;

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
   * If the postal code is designated to an organization, or a division of such,
   * this property stores the `Corporation` object that describes it.
   */
  corporation: Corporation | null;
}

/**
 * A `Corporation` object would store the information about the organization,
 * or the division of a organization, which has its special postal code designated.
 */
export interface Corporation {
  /**
   * The name of the organization, or the division of such.
   */
  name: string;

  /**
   * The reading of the division's name.
   */
  name_kana: string;

  /**
   * The address line by which the division is *postally* reachable,
   * in the sense it doesn't necessarily point to the actual
   * address of its business place.
   */
  block_lot: string;

  /**
   * The name of the post office that handles the postal items
   * for the division.
   */
  post_office: string;

  /**
   * `0` indicates the postal code most likely describes a
   * actual business place, and `1` indicates it refers to a
   * post office box.
   */
  code_type: number;
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
 * A `Facet` is a tuple that stores a facet representation
 * of some level and the number of the items in the result's
 * subset that belong to the facet.
 *
 * A facet representation consist of hierarchical facet strings
 * delimited by slashes.
 *
 * Example: `["/東京都/港区", 7]`
 */
export type Facet = [string, number];

/**
 * An `AddressSearcherResponse` describes a response to
 * "searchAddresses" API call.
 */
export interface AddressSearcherResponse extends AddressResolverResponse {
  /**
   * The query that the search has been performed for.
   */
  query: string;

  /**
   * The number of the resulting items in total.
   */
  count: number;

  /**
   * The offset from which the result has been retrieved.
   */
  offset: number;

  /**
   * The number of items that has been intended, at most, to retrieve from the result.
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
 * An `AddressSearcherOptions` stores a set of parameters
 * that will be sent to "searchAddresses" API.
 */
export interface AddressSearcherOptions {
  /**
   * The query to search against the address database.
   *
   * Example: `"東京都 AND 渋谷区"`
   */
  query: string | undefined;

  /**
   * The offset from which you want to retrieve the result.
   */
  offset?: number | undefined;

  /**
   * The maximum number of items that you want to retrieve.
   *
   * Defaults to 100 unless specified.
   */
  limit?: number | undefined;

  /**
   * The version of which the database is searched against.
   *
   * Defaults to the latest available version.
   *
   * Example: `"2021-04-30"`
   */
  version?: string | undefined;

  /**
   * The facet representation at which level the resulting facets
   * will be shapen.
   *
   * Example: `"/東京都"`
   */
  facet?: string | undefined;
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
   * The reading for the name of the prefecture in katakana.
   *
   * Example: `"トウキョウト"`
   */
  prefecture_kana: string;

  /**
   * The remaining portion of the JISX0402 code that has the leading two-dight prefecture code removed.
   *
   * Example: `"113"`
   */
  city_code: string;

  /**
   * The name of the city.
   * The county name may precede it, or to the contrary, the name of the
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
   * The reading for the name of the city in katakana.
   *
   * Examples:
   *
   * * `"ミナトク"`
   * * `"オオサカシキタク"`
   * * `"カガミハラシ"`
   * * `"チチブグンナガトロチョウ"`
   */
  city_kana: string;
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
