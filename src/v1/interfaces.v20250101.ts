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
   * The reconstructed numerical part of the address line below the second-level
   * administrative division.
   *
   * Example: `"3-12-14"`
   */
  block_lot_num: string | null;

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
 * The enum for `update_status` property of `Address` data.
 */
export enum UpdateStatus {
  /**
   * The record is not modified.
   */
  NONE = 0,
  /**
   * The record is modified.
   */
  UPDATED = 1,
  /**
   * The record is marked as no longer valid.
   */
  ABOLISHED = 2,
}

/**
 * The enum for `update_reason` property of `Address` data.
 */
export enum UpdateReason {
  /**
   * The record is not modified.
   */
  NONE = 0,
  /**
   * The city where the area to which this record was assigned previously belongs
   * was merged with other cities.
   */
  REDESIGNATED = 1,
  /**
   * The district to which this record is assigned had gone through address
   * reorganization, such as designation as a building-based addressing area.
   */
  ADDRESSING_SYSTEM_RENEWAL = 2,
  /**
   * The district to which this record is assigned had gone through area
   * reorganization.
   */
  READJUSTMENT = 3,
  /**
   * The area or its districts weren't changed, but the postal codes
   * were reassigned.
   */
  REASSIGNMENT = 4,
  /**
   * The record contained some errors and was amended.
   */
  AMENDMENT = 5,
  /**
   * The record is marked as no longer valid.
   */
  ABOLISHED = 6,
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
  prefecture_roman: string;

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
  city_roman: string;

  /**
   * The name of the county.
   *
   * Examples:
   *
   * * `"秩父郡"`
   */
  county: string;

  /**
   * The reading of the name of the county in katakana.
   *
   * Examples:
   *
   * * `"チチブグン"`
   * "`
   */
  county_kana: string;

  /**
   * The "romanized" reading of the name of the county.
   *
   * Examples:
   *
   * * `"Chichibu"`
   */
  county_roman: string;

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
  city_without_county_and_ward: string;

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
  city_without_county_and_ward_kana: string;

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
  city_without_county_and_ward_roman: string;

  /**
   * The name of the ordinance-designated ward, if applicable.
   *
   * Examples:
   *
   * * `"千種区"`
   */
  city_ward: string;

  /**
   * The reading of the name of the ordinance-designated ward in katakana.
   *
   * Examples:
   *
   * * `"チクサク"`
   */
  city_ward_kana: string;

  /**
   * The "romanized" reading of the name of the city.
   *
   * Examples:
   *
   * * `"Chikusa-ku"`
   */
  city_ward_roman: string;

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
  town_roman: string;

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
  town_jukyohyoji: boolean;

  /**
   * The value that indicates if the record is updated or deleted for this version.
   */
  update_status: UpdateStatus;

  /**
   * The value that represents the reason how the record is changed, when
   * `update_status` is set to non-zero value.
   */
  update_reason: UpdateReason;

  /**
   * If the postal code is designated to an organization, or a division of such,
   * this property stores the `Corporation` object that describes it.
   */
  corporation: Corporation | null;
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
 * An `AddressSearcherQuery` describes a search query and its address elements.
 */
export interface AddressSearcherQuery {
  /**
   * The query that the search has been performed for.
   */
  q: string | null;

  /**
   * The unprocessed portions of the address string that the search has been performed for.
   */
  t: string | null;

  /**
   * The name of the prefecture.
   *
   * Example: `"東京都"`
   */
  prefecture: string | null;

  /**
   * The name of the county.
   *
   * Example: `"秩父郡"`
   */
  county: string | null;

  /**
   * The name of the city, not including the county or the ward.
   *
   * Example: `"各務原市"`
   */
  city: string | null;

  /**
   * The name of the ordinance-designated wards.
   *
   * Example: `"千種区"`
   */
  city_ward: string | null;

  /**
   * The name of the town.
   *
   * Example: `箱石`
   */
  town: string | null;

  /**
   * The instructional phrase (通り名 in Japanese that signifies the (non-administrative)
   * sub-area of the town, the way which describe is very specific to a district of
   * Kyoto city.
   *
   * Examples:
   *
   * * `"先斗町通蛸薬師上る"`
   * * `"大宮通寺之内半丁下る東入"`
   */
  kyoto_street: string | null;

  /**
   * The reconstructed numerical part of the address line below the second-level
   * administrative division.
   *
   * Example: `"3-12-14"`
   */
  block_lot_num: string | null;

  /**
   * The extracted building name in the address line below the second-level
   * administrative devision, without the floor name.
   *
   * Example: `"麹町駅前ヒルトップ"`
   */
  building: string | null;

  /**
   * The extracted floor name and room number in the address line below the
   * second-level administrative devision.
   *
   * Example: `"8階801"`
   */
  floor_room: string | null;
}

/**
 * An `AddressSearcherOptions` stores a set of parameters
 * that will be sent to "searchAddresses" API.
 */
export interface AddressSearcherOptions {
  /**
   * The query to search against the address database.
   *
   * Either `q` or `t` must be present.
   *
   * Example: `"東京都 AND 渋谷区"`
   */
  q?: string;

  /**
   * The unprocessed portions of the address string to search against the address database.
   *
   * Either `q` or `t` must be present.
   *
   * Example: `"東京都渋谷区初台"`
   */
  t?: string;

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
      [key: string]: BankBranch[];
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
    branch: BankBranch[];
  };
}

/**
 * An `NTACorporateInfoProcess` represents the reason why the record
 * was added.
 */
export enum NTACorporateInfoProcess {
  /**
   * Indicates new record.
   */
  NEW = 1,
  /**
   * Indicates trade name or corporate name was changed.
   */
  NAME_CHANGED = 11,
  /**
   * Indicates domestic address was changed.
   */
  DOMESTIC_ADDRESS_CHANGED = 12,
  /**
   * Indicates overseas address was changed.
   */
  OVERSEAS_ADDRESS_CHANGED = 13,
  /**
   * Indicates registration record was closed.
   */
  REGISTRATION_RECORD_CLOSED = 21,
  /**
   * Indicates registration record was reopened.
   */
  REGISTRATION_RECORD_REOPENED = 22,
  /**
   * Indicates absorption merger completed.
   */
  ABSORPTION_MERGER_COMPLETED = 71,
  /**
   * Indicates absorption merger was invalidated.
   */
  ABSORPTION_MERGER_INVALIDATED = 72,
  /**
   * Indicates registration record was erased.
   */
  REGISTRATION_RECORD_ERASED = 81,
  /**
   * Indicates the record was deleted.
   */
  DELETED = 99,
}

/**
 * An `NTACorporateInfoKind` represents the kind of corporate.
 */
export enum NTACorporateInfoKind {
  /**
   * National public entity
   */
  NATIONAL_PUBLIC_ENTITY = 101,
  /**
   * Local public entity
   */
  LOCAL_PUBLIC_ENTITY = 201,
  /**
   * Limited liability company by share, aka K.K.
   */
  KABUSHIKI_KAISHA = 301,
  /**
   * Old style of limited liability company not by share
   */
  YUGEN_KAISHA = 302,
  /**
   * General partnership company
   */
  GOMEI_KAISHA = 303,
  /**
   * Limited partnership company
   */
  GOSHI_KAISHA = 304,
  /**
   * Limited liability company, aka G.K.
   */
  GODO_KAISHA = 305,
  /**
   * Other types of company
   */
  OTHER_COMPANY = 399,
  /**
   * Foreign company
   */
  FOREIGN_COMPANY = 401,
  /**
   * Other corporate kinds which do not belong to the above
   */
  OTHER = 499,
}

/**
 * An `NTACorporateInfoCloseCause` represents the reason why the corporate
 * was closed.
 */
export enum NTACorporateInfoCloseCause {
  /**
   *  Liquidation completed
   */
  LIQUIDATION_COMPLETED = 1,
  /**
   *  Dissolution by merger
   */
  DISSOLUTION_BY_MERGER = 11,
  /**
   *  A registerer closed the corporate
   */
  CLOSED_BY_REGISTERER = 21,
  /**
   *  Other reasons
   */
  OTHER = 31,
}

/**
 * An `NTAEntityAddress` object would store the domestic or foreign address.
 */
export interface NTAEntityAddress {
  /**
   * The postal code for the place this object represents.
   */
  postal_code: string | null;

  /**
   * The 5 digit Japanese municipality code (全国地方公共団体コード)
   * for the administrative division where the place this object represents
   * belongs. Can be null either for the foreign address, or the address
   * is based on the old address system.
   */
  jisx0402: string | null;

  /**
   * The name of the prefecture in Kanji.
   *
   * Example: `"東京都"`
   */
  prefecture: string | null;

  /**
   * The reading of the name of the prefecture in katakana.
   *
   * Example: `"トウキョウト"`
   */
  prefecture_kana: string | null;

  /**
   * The "romanized" reading of the name of the prefecture.
   *
   * Example: `"Tokyo"`
   */
  prefecture_roman: string | null;

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
  city: string | null;

  /**
   * The reading of the name of the city in katakana.
   * The county name may precede it, or the name of the
   * ward would follow it in case the city has ordinance-designated wards.
   *
   * Examples:
   *
   * * `"ミナトク"`
   * * `"オオサカシキタク"`
   * * `"カカミガハラシ"`
   * * `"秩父郡長瀞町"`
   */
  city_kana: string | null;

  /**
   * The "romanized" reading of the name of the city in katakana.
   * The county name may precede it, or the name of the
   * ward would follow it in case the city has ordinance-designated wards.
   *
   * Examples:
   *
   * * `"Minato-ku"`
   * * `"Kita-ku, Osaka"`
   * * `"Kakamigahara"`
   * * `"Nagatoro"`
   */
  city_roman: string | null;

  /**
   * The part of the address line below the second-level administrative division.
   * The string is preprocessed so it would fit within 300 characters
   * by NTA if it is longer than that length actually.
   * If the text uses a Kanji which is not JIS Level 1 or 2, The Kanji
   * will be converted into correspondent JIS Level 1 or 2 Kanjis.
   * You can refer to the unnormalized version of the text from a
   * correspondent image file.
   * See `address_image_id` for details.
   *
   * Example: `"麹町３丁目１２－１４麹町駅前ヒルトップ８階"`
   */
  street_number: string;

  /**
   * The extracted name of the third-level administrative division, which
   * correspond to the "o-aza", or the "cho" with its chome part stripped out.
   *
   * Example: `"麹町"`
   */
  town: string | null;

  /**
   * The extracted instructional phrase (通り名 in Japanese) very specific
   * to Kyoto city, which helps one to locate the place out of the area of
   * the town.
   *
   * Example: `"先斗町通蛸薬師上る"`
   */
  kyoto_street: string | null;

  /**
   * The reconstructed numerical part of the address line below the second-level
   * administrative division.
   *
   * Example: `"3-12-14"`
   */
  block_lot_num: string | null;

  /**
   * The extracted building name in the address line below the second-level
   * administrative division, without the floor name.
   *
   * Example: `"麹町駅前ヒルトップ"`
   */
  building: string | null;

  /**
   * The extracted floor name and room number in the address line below the
   * second-level administrative division.
   *
   * Example: `"８階８０１"`
   */
  floor_room: string | null;
}

/**
 * An `NTACorporateInfo` object would store the information about Basic 3 Information
 * of Corporate Number, which is published by Japan National Tax Agency.
 */
export interface NTACorporateInfo {
  /**
   * The published date of the record, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the record was published.
   *
   * Please note that this field doesn't indicate the actual date of
   * the updated date of the record. The published date may
   * be later than the updated date. Please see `update_date` for further
   * details.
   *
   * Example: `"2021-01-01"`
   */
  published_date?: string;

  /**
   * The revision number of the corporate record, non zero-padded
   * 8 digit number at maximum.
   *
   * Example: `1`
   */
  sequence_number: number;

  /**
   * The corporate number, 12 digit number plus 1 check digit.
   *
   * Example: `2021001052596`
   */
  corporate_number: string;

  /**
   * The reason why the record was added.
   *
   * Example: `NTACorporateInfoProcess.NEW`
   */
  process: NTACorporateInfoProcess;

  /**
   * The flag if the record was corrected or not.
   *
   *  * `1` indicates the record was corrected.
   *  * `0` indicates the record was not corrected.
   *
   * Example: `0`
   */
  correct: number;

  /**
   * The date the record was updated, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day.
   *
   * Unlike `change_date` and `published_date`, this field indicates the
   * actual update date of the corporate information in NTA data.
   * See `change_date` and `published_date` for further information.
   *
   * Example: `"2021-01-01"`
   */
  update_date: string;

  /**
   * The changed date of the record, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day.
   *
   * The meaning of "changed" depends on other contexts of the record.
   * If `process` is `NEW`, the changed date means the corporate number
   * was assigned. If `process` is not `NEW` and `kind` is not a public
   * entity, the changed date means the date related to the process.
   * If `kind` is a public entity, the changed date means when the
   * process occurred.
   *
   * Example: `"2021-01-01"`
   */
  change_date: string;

  /**
   * The trade name or corporate name in Japanese.
   * All the characters are rendered in full-width form.
   * The string is preprocessed so it would fit within 150 characters
   * by NTA if it is longer than that length actually.
   * If the text uses a Kanji which is not JIS Level 1 or 2, The Kanji
   * will be converted into correspondent JIS Level 1 or 2 Kanjis.
   * You can refer to the unnormalized version of the text from a
   * correspondent image file.
   * See `name_image_id` for details.
   *
   * Example: `"株式会社オープンコレクター"`
   */
  name: string;

  /**
   * The trade name or corporate name image ID, 8 digit number at maximum.
   * If you want to obtain the image file, please refer to
   * https://www.houjin-bangou.nta.go.jp/image?imageid=NAME_IMAGE_ID,
   * where NAME_IMAGE_ID is a zero-padded 8 digit number of the ID.
   * For example, if the ID is `100`, You can get the image file from
   * https://www.houjin-bangou.nta.go.jp/image?imageid=00000100.
   * If `name` is not normalized, This value is set to `null`.
   *
   *  Examples:
   *
   *  * `"99999999"`
   *  * `null`
   */
  name_image_id: string | null;

  /**
   * Kind of the corporate.
   *
   * Example: `NTACorporateInfoKind.KABUSHIKI_KAISHA`
   */
  kind: NTACorporateInfoKind;

  /**
   * The address of the legal entity.
   */
  address: NTAEntityAddress;

  /**
   * The address image ID, 8 digit number at maximum.
   * If you want to obtain the image file, please refer to
   * https://www.houjin-bangou.nta.go.jp/image?imageid=ADDRESS_IMAGE_ID,
   * where ADDRESS_IMAGE_ID is a zero-padded 8 digit number of the ID.
   * For example, if the ID is `100`, You can get the image file from
   * https://www.houjin-bangou.nta.go.jp/image?imageid=00000100.
   * If `street_number` is not normalized, this value is set to `null`.
   *
   *  Examples:
   *
   *  * `"99999999"`
   *  * `null`
   */
  address_image_id: string | null;

  /**
   * The corporate address outside of Japan, written in Japanese.
   * The string is preprocessed so it would fit within 300 characters
   * by NTA if it is longer than that length actually.
   * If the text uses a Kanji which is not JIS Level 1 or 2, The Kanji
   * will be converted into correspondent JIS Level 1 or 2 Kanjis.
   * You can refer to the unnormalized version of the text from a
   * correspondent image file.
   * See `address_outside_image_id` for details.
   *
   * Example: `アメリカ合衆国ハワイ州２２４１１メリーランド州トライオン・ストリート２０`
   */
  address_outside: string;

  /**
   * The foreign address image ID, 8 digit number at maximum.
   * If you want to obtain the image file, please refer to
   * https://www.houjin-bangou.nta.go.jp/image?imageid=ADDRESS_IMAGE_ID,
   * where ADDRESS_IMAGE_ID is a zero-padded 8 digit number of the ID.
   * For example, if the ID is `100`, You can get the image file from
   * https://www.houjin-bangou.nta.go.jp/image?imageid=00000100.
   * If `address_outside` is not normalized, this value is set to `null`.
   *
   *  Examples:
   *
   *  * `"99999999"`
   *  * `null`
   */
  address_outside_image_id: string | null;

  /**
   * The date of the record when the corporate was closed, in the
   * form of `"YYYY-MM-DD"` where Y, M, and D represent digits of
   * the year, month, and day.
   * If the corporate is not closed, this value is set to `null`.
   *
   * Example: `"2021-01-01"`
   */
  close_date: string | null;

  /**
   * The reason the corporate was closed.
   * If the corporate is not closed, this value is set to `null`.
   *
   * Example: `NTACorporateInfoCloseCause.LIQUIDATION_COMPLETED`
   */
  close_cause: NTACorporateInfoCloseCause | null;

  /**
   * The corporate number of the successor of the closed corporate,
   * 12 digit number plus 1 check digit.
   * If the corporate is not closed, this value is set to `null`.
   *
   * Example: `2021001052596`
   */
  successor_corporate_number: string | null;

  /**
   * The reason why the process occurred, 500 characters at maximum.
   * Both zenkaku and hankaku format are allowed.
   *
   * Example: `令和２年５月１日○○株式会社に合併し解散`
   */
  change_cause: string;

  /**
   * The date of the record when the corporate number was assigned,
   * in the form of `"YYYY-MM-DD"` where Y, M, and D represent
   * digits of the year, month, and day.
   *
   * Example: `"2021-01-01"`
   */
  assignment_date: string;

  /**
   * The trade name or corporate name in English with hankaku format,
   * 300 characters at maximum.
   * If the English name is not registered, this value is set to blank.
   *
   * Example: `"Rumoi Summary Court"`
   */
  en_name: string;

  /**
   * The address without prefecture in English with hankaku format.
   * The string is preprocessed so it would fit within 600 characters
   * by NTA if it is longer than that length actually.
   * If the address is not registered, this value is set to `null`.
   *
   * Example: `4-7, Kashiwagicho, Tomakomai shi`
   */
  en_address_line: string | null;

  /**
   * The corporate address outside of Japan, written in alphabetical form.
   * The string is preprocessed so it would fit within 600 characters
   * by NTA if it is longer than that length actually.
   * If the address is not registered, this value is set to `null`.
   *
   * Example: `35 Selegie Road, suiteA-2 Honolulu, Maryland 21401, U.S.A.`
   */
  en_address_outside: string | null;

  /**
   * The furigana correspondent to the corporate name.
   * If the furigana is not registered, this value is set to blank.
   *
   * Example: `オープンコレクター`
   */
  furigana: string;

  /**
   * If the corporate address is confirmed that it doesn't exist,
   * this value is set to `"1"`.
   *
   * Example: `0`
   */
  hihyoji: number;

  /**
   * The qualified invoice issuer number of the entity.
   *
   * Example: `"T2021001052596"`
   */
  qualified_invoice_issuer_number: string | null;
}

/**
 * An `NTACorporateInfoResolverResponse` describes a response to
 * "getNTACorporateInfo" API call.
 */
export interface NTACorporateInfoResolverResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The set of the data that match to the query.
   */
  data: NTACorporateInfo;
}

export type NTACorporateInfoSearchMode =
  | 'exact'
  | 'partial'
  | 'exact_with_kind';

/**
 * An `NTACorporateInfoSearcherOptions` stores a set of parameters
 * that will be sent to `searchCorporateInfo` API.
 */
export interface NTACorporateInfoSearcherOptions {
  /**
   * The query to search against the address database.
   *
   * Example: `"東京都 AND オープンコレクター"`
   */
  query: string;

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
   * The search mode.
   *
   * Defaults to `partial`. If set to `partial`, the API will
   * return partially match results. If set to `exact`, the
   * result includes only the corporates which name without
   * corporate kind exactly matches the query. Please note
   * that the `exact` mode doesn't match a query that contains
   * corporate kind. For example, the query
   * `株式会社オープンコレクター` doesn't return any result in
   * the `exact` mode, but `オープンコレクター` will return
   * the result. You can search with a corporate name with
   * a corporate kind in `exact_with_kind` mode.
   *
   * Example: `"exact"`
   */
  mode?: NTACorporateInfoSearchMode | undefined;

  /**
   * The facet representation at which level the resulting facets
   * of prefecture and city will be shapen.
   * The facet should be written in Japanese.
   * If you want to specify foreign corporates, please set
   * `/海外など` to this field.
   *
   * Example: `"/東京都"`
   */
  facet_area?: string | undefined;

  /**
   * The facet representation at which level the resulting facets
   * of kind will be shapen.
   * The facet should be written in Japanese.
   *
   * Example: `"/株式会社"`
   */
  facet_kind?: string | undefined;

  /**
   * The facet representation at which level the resulting facets
   * of proecess will be shapen.
   * The facet should be written in Japanese.
   *
   * Example: `"/商号又は名称の変更"`
   */
  facet_process?: string | undefined;

  /**
   * The facet representation at which level the resulting facets
   * of close cause will be shapen.
   * The facet should be written in Japanese.
   *
   * Example: `"/清算の結了等"`
   */
  facet_close_cause?: string | undefined;
}

/**
 * An `NTACorporateInfoFacets` represents facets of some level and
 * the number of the items in the result's subset that belong to
 * the facet.
 *
 * Each facet representation consist of hierarchical facet strings
 * delimited by slashes.
 *
 * Example: `{"area": ["/東京都/港区", 7], "kind": ["/株式会社", 7]}`
 */
export interface NTACorporateInfoFacets {
  area?: Facet;
  kind?: Facet;
  process?: Facet;
  close_cause?: Facet;
}

/**
 * An `NTACorporateInfoSearcherResponse` describes a response to
 * `searchNTACorporateInfo` API call.
 */
export interface NTACorporateInfoSearcherResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The set of the data that match to the query.
   */
  data: NTACorporateInfo[];

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
   * The number of items that have been intended, at most, to retrieve from the result.
   */
  limit: number;

  /**
   * The facets of the result that form with the query.
   *
   * If no facet is given, those will be unavailable and this stores null.
   */
  facets: NTACorporateInfoFacets | null;
}

/**
 * An `NTAQualifiedInvoiceIssuerProcess` specifies the state of the registration.
 */
export enum NTAQualifiedInvoiceIssuerProcess {
  /**
   * Implies that the record is newly registered.
   */
  NEW = 1,

  /**
   * Implies that the record has been changed.
   */
  INFORMATION_CHANGED = 2,

  /**
   * Implies that the registration has been expired.
   */
  REGISTRATION_EXPIRED = 3,

  /**
   * Implies that the registration has been invalidated.
   */
  REGISTRATION_DISPOSED = 4,

  /**
   * Implies that the registration has been deleted.
   */
  DELETED = 99,
}

/**
 * An `NTAQualifiedInvoiceIssuerCorrect` implies the reason for the change,
 * if the record has been updated.
 */
export enum NTAQualifiedInvoiceIssuerCorrect {
  /**
   * Not the correction.
   */
  OTHER = 0,

  /**
   * Correction.
   */
  CORRECTION = 1,
}

/**
 * An `NTAQualifiedInvoiceIssuerKind` specifies the kind of the invoice issuer.
 */
export enum NTAQualifiedInvoiceIssuerKind {
  /**
   * Implies that the record is for a sole proprietor.
   */
  INDIVIDUAL = 1,

  /***
   * Implies that the record is for a corporate entity.
   */
  CORPORATION = 2,
}

/**
 * An `NTAQualifiedInvoiceIssuerCountry` specifies whether the issuing entity is domestic or not,
 * and if domestic, whether it is specifically designated by the National Tax Agency.
 */
export enum NTAQualifiedInvoiceIssuerCountry {
  /**
   * Implies that the record is for a domestic entity
   */
  DOMESTIC_ENTITY = 1,

  /**
   * Implies that the record is for a designated foreign entity.
   */
  DESIGNATED_FOREIGN_ENTITY = 2,

  /**
   * Implies that the record is for a general (not specifically designated) foreign entity.
   */
  GENERAL_FOREIGN_ENTITY = 3,
}

/**
 * An `NTAQualifiedInvoiceIssuerUpdateStatus` specifies whether the record is latest or obsolete.
 */
export enum NTAQualifiedInvoiceIssuerUpdateStatus {
  /**
   * Implies that the record is obsolete
   */
  OBSOLETE = 0,

  /**
   * Implies that the record is the latest one.
   */
  LATEST = 1,
}

/**
 * An `NTAQualifiedInvoiceIssuerInfo` represents a record for the invoice issuer qualified by
 * the National Tax Agency.
 */
export interface NTAQualifiedInvoiceIssuerInfo {
  /**
   * The published date of the record, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the record was published.
   *
   * Please note that this field doesn't indicate the actual date of
   * the updated date of the record. The published date may
   * be later than the updated date. Please see `update_date` for further
   * details.
   *
   * Example: `"2021-01-01"`
   */
  published_date: string;

  /**
   * The revision number of the issuer record, non zero-padded
   * 8 digit number at maximum.
   *
   * Example: `1`
   */
  sequence_number: number;

  /**
   * The qualified invoice issuer number of the entity.
   *
   * Example: `"T2021001052596"`
   */
  qualified_invoice_issuer_number: string;

  /**
   * The status of the registration.
   *
   * Example: `NTAQualifiedInvoiceIssuerProcess.NEW`
   */
  process: NTAQualifiedInvoiceIssuerProcess;

  /**
   * The reason for the change, if the record has been updated. `null` when the record has been deleted.
   */
  correct: NTAQualifiedInvoiceIssuerCorrect | null;

  /**
   * The kind of the invoice issuer.
   */
  kind: NTAQualifiedInvoiceIssuerKind;

  /**
   * Whether the issuing entity is domestic or not, and if domestic, whether it is
   * specifically designated by the National Tax Agency.
   */
  country: NTAQualifiedInvoiceIssuerCountry;

  /**
   * Whether the record is latest or obsolete.
   */
  latest: NTAQualifiedInvoiceIssuerUpdateStatus;

  /**
   * The date of the registration, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the issuer was qualified and registered.
   *
   * Example: `"2021-01-01"`
   */
  registration_date: string | null;

  /**
   * The date the record was updated, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day.
   *
   * Example: `"2021-01-01"`
   */
  update_date: string | null;

  /**
   * The date the record was invalidated, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day.
   *
   * Example: `"2021-01-01"`
   */
  disposal_date: string | null;

  /**
   * The date the record was expired, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day.
   *
   * Example: `"2021-01-01"`
   */
  expire_date: string | null;

  /**
   * Address of the business entity's headquarter. This would differ from `address_request`
   * for administrative or other reasons.
   */
  address: NTAEntityAddress;

  /**
   * Address of the business entity's headquarter, as provided in the original application.
   */
  address_request: NTAEntityAddress;

  /**
   * Address of the domestic business location, if the issuer is a foreign entity, and there's any.
   */
  address_inside: NTAEntityAddress;

  /**
   * Reading of the invoice issuer, if the issuer is a foreign entity.
   */
  kana: string | null;

  /**
   * Name of the issuer.
   */
  name: string | null;

  /**
   * Trade name of the issuer, if any.
   */
  trade_name: string | null;

  /**
   * Alias or former name of the issuer.
   */
  popular_name_previous_name: string | null;
}

/**
 * An `NTAQualifiedInvoiceIssuerInfoResolverResponse` describes a response to
 * `getNTAQualifiedInvoiceIssuerInfo` API call.
 */
export interface NTAQualifiedInvoiceIssuerInfoResolverResponse {
  /**
   * The version of the data, in the form of `"YYYY-MM-DD"`
   * where Y, M, and D represent digits of the year, month, and day
   * the source data became available.
   */
  version: string;

  /**
   * The data that match to the query.
   */
  data: NTAQualifiedInvoiceIssuerInfo;
}
