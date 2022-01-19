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
   * The reconstructed numerical part of the address line below the second-level
   * administrative division.
   *
   * Example: `"3-12-14"`
   */
  block_lot_num?: string;

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

/**
 * A `NTACorporateInfoProcess` represents the reason why the record
 * was added.
 */
export enum NTACorporateInfoProcess {
  /**
   * Indicates new record.
   */
  NEW = '1',

  /**
   * Indicates trade name or corporate name was changed.
   */
  NAME_CHANGED = '11',
  /**
   * Indicates domestic address was changed.
   */
  DOMESTIC_ADDRESS_CHANGED = '12',
  /**
   * Indicates overseas address was changed.
   */
  OVERSEAS_ADDRESS_CHANGED = '13',
  /**
   * Indicates registration record was closed.
   */
  REGISTRATION_RECORD_CLOSED = '21',
  /**
   * Indicates registration record was reopened.
   */
  REGISTRATION_RECORD_REOPENED = '22',
  /**
   * Indicates absorption merger completed.
   */
  ABSORPTION_MERGER_COMPLETED = '71',
  /**
   * Indicates absorption merger was invalidated.
   */
  ABSORPTION_MERGER_INVALIDATED = '72',
  /**
   * Indicates registration record was erased.
   */
  REGISTRATION_RECORD_ERASED = '81',
  /**
   * Indicates the record was deleted.
   */
  DELETED = '99',
}

/**
 * A `NTACorporateInfoKind` represents the kind of corporate.
 */
export enum NTACorporateInfoKind {
  /**
   * National public entity
   */
  NATIONAL_PUBLIC_ENTITY = '101',
  /**
   * Local public entity
   */
  LOCAL_PUBLIC_ENTITY = '201',
  /**
   * Limited liability company by share, aka K.K.
   */
  KABUSHIKI_KAISHA = '301',
  /**
   * Old style of limited liability company not by share
   */
  YUGEN_KAISHA = '302',
  /**
   * General partnership company
   */
  GOMEI_KAISHA = '303',
  /**
   * Limited partnership company
   */
  GOSHI_KAISHA = '304',
  /**
   * Limited liability company, aka G.K.
   */
  GODO_KAISHA = '305',
  /**
   * Other types of company
   */
  OTHER_COMPANY = '399',
  /**
   * Foreign company
   */
  FOREIGN_COMPANY = '401',
  /**
   * Other corporate kinds which do not belong to the above
   */
  OTHER = '499',
}

/**
 * A `NTACorporateInfoCloseCause` represents the reason why the corporate
 * was closed.
 */
export enum NTACorporateInfoCloseCause {
  /**
   *  Liquidation completed
   */
  LIQUIDATION_COMPLETED = '1',
  /**
   *  Dissolution by merger
   */
  DISSOLUTION_BY_MERGER = '11',
  /**
   *  A registerer closed the corporate
   */
  CLOSED_BY_REGISTERER = '21',
  /**
   *  Other reasons
   */
  OTHER = '31',
}

/**
 * A `NTACorporateInfo` object would store the information about Basic 3 Information
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
  published_date: string;

  /**
   * The revision number of the corporate record, non zero-padded
   * 8 digit number at maximum.
   *
   * Example: `1`
   */
  sequence_number: string;

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
   *  * `"1"` indicates the record was corrected.
   *  * `"0"` indicates the record was not corrected.
   *
   * Example: `"0"`
   */
  correct: string;

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
   * The name of the prefecture in Kanji.
   *
   * Example: `"東京都"`
   */
  prefecture_name: string;

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
  city_name: string;

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
  town?: string;

  /**
   * The reconstructed numerical part of the address line below the second-level
   * administrative division.
   *
   * Example: `"3-12-14"`
   */
  block_lot_num?: string;

  /**
   * The extracted building name in the address line below the second-level
   * administrative devision, without the floor name.
   *
   * Example: `"麹町駅前ヒルトップ"`
   */
  building?: string;

  /**
   * The extracted floor name and room number in the address line below the
   * second-level administrative devision.
   *
   * Example: `"８階８０１"`
   */
  floor_room?: string;

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
   * The 5 digit Japanese municipality code (全国地方公共団体コード)
   * for the administrative division where the place this object represents
   * belongs.
   */
  jisx0402: string;

  /**
   * The postal code for the place this object represents.
   */
  post_code: string;

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
   * The name of the prefecture in English.
   *
   * Example: `"Tokyo"`
   */
  en_prefecture_name: string;

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
   * Example: `"0"`
   */
  hihyoji: string;
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
 * A `NTACorporateInfoFacets` represents facets of some level and
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
