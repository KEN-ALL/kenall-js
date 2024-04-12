import * as v20230901 from './interfaces.v20230901';

export type City = v20230901.City;
export type CityResolverResponse = v20230901.CityResolverResponse;
export type Corporation = v20230901.Corporation;
export type Facet = v20230901.Facet;
export type UpdateStatus = v20230901.UpdateStatus;
export type UpdateReason = v20230901.UpdateReason;
export type Address = v20230901.Address;
export type AddressResolverResponse = v20230901.AddressResolverResponse;
export type AddressSearcherQuery = v20230901.AddressSearcherQuery;
export type AddressSearcherOptions = v20230901.AddressSearcherOptions;
export type AddressSearcherResponse = v20230901.AddressSearcherResponse;

export type NTACorporateInfoCloseCause = v20230901.NTACorporateInfoCloseCause;
export type NTACorporateInfoSearchMode = v20230901.NTACorporateInfoSearchMode;
export type NTACorporateInfoSearcherOptions =
  v20230901.NTACorporateInfoSearcherOptions;
export type NTACorporateInfoFacets = v20230901.NTACorporateInfoFacets;

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
 * A `NTACorporateInfoKind` represents the kind of corporate.
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
   * The data that match to the query.
   */
  data: NTACorporateInfo;
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
