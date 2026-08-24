/**
 * The 2026-08-01 API version leaves every response payload identical to
 * 2025-01-01; what it adds is the ability to narrow the bank APIs down with
 * a set of query parameters. The response types are therefore re-exported
 * as-is, and only the request-side types are declared here.
 */
export * from './interfaces.v20250101.js';

/**
 * A `BankSearchMatchMode` tells how the search text is matched against the
 * names and the kana readings of the records.
 */
export type BankSearchMatchMode =
  /**
   * Matches from the beginning of the name or the reading. This is the
   * default, and is what suits an incremental narrowing UI.
   */
  | 'prefix'
  /**
   * Matches anywhere in the name or the reading.
   */
  | 'contains';

/**
 * A `BankType` designates a category of the financial institutions, which is
 * derived from the number ranges of the Zengin institution code system.
 */
export type BankType =
  /**
   * Banks (`0001`-`0999`).
   */
  | 'bank'
  /**
   * Shinkin banks (`1000`-`1999`), including Shinkin Central Bank.
   */
  | 'shinkin'
  /**
   * Credit cooperatives and labour banks (`2000`-`2999`), including
   * Shoko Chukin Bank and Zenshinkumiren.
   */
  | 'shinkumi_rokin'
  /**
   * Agricultural and fishery cooperatives (`3000`-`9899`), including
   * Norinchukin Bank and the prefectural credit federations.
   */
  | 'nokyo_gyokyo'
  /**
   * Japan Post Bank (`9900`-`9999`).
   */
  | 'yucho';

/**
 * A `BankSearcherOptions` stores a set of parameters that will be sent to
 * `searchBanks` API.
 *
 * Every property is optional; an empty query simply retrieves the whole set,
 * in which case the API responds with a 404 when nothing is available.
 */
export interface BankSearcherOptions {
  /**
   * The text to search the bank names and the kana readings with.
   *
   * Hiragana, katakana and kanji are all accepted; the differences in small
   * kana, prolonged sound marks and character width are normalized away
   * before matching, and a trailing institution-type suffix such as `"銀行"`
   * or `"信用金庫"` is ignored.
   *
   * When this is given, an empty result comes back as a 200 with an empty
   * `data` rather than a 404.
   *
   * Example: `"みずほ"`
   */
  q?: string | undefined;

  /**
   * How `q` is matched against the names and the readings.
   *
   * Defaults to `"prefix"`.
   */
  match?: BankSearchMatchMode | undefined;

  /**
   * The category of the institutions to retrieve.
   */
  type?: BankType | undefined;

  /**
   * The version of the database that the query has to be performed against.
   *
   * Defaults to the latest available version.
   *
   * Example: `"2026-08-01"`
   */
  version?: string | undefined;
}

/**
 * A `BankBranchSearcherOptions` stores a set of parameters that will be sent
 * to `searchBankBranches` API.
 *
 * Note that, unlike {@link BankSearcherOptions}, there is no `type` here as
 * the category is already determined by the bank being queried.
 */
export interface BankBranchSearcherOptions {
  /**
   * The text to search the branch names and the kana readings with.
   *
   * The same normalization as {@link BankSearcherOptions.q} applies, except
   * that the suffix being ignored is `"支店"`.
   *
   * When this is given, an empty result comes back as a 200 with an empty
   * `branches` rather than a 404, as long as the bank itself exists.
   *
   * Example: `"丸の内"`
   */
  q?: string | undefined;

  /**
   * How `q` is matched against the names and the readings.
   *
   * Defaults to `"prefix"`.
   */
  match?: BankSearchMatchMode | undefined;

  /**
   * The version of the database that the query has to be performed against.
   *
   * Defaults to the latest available version.
   *
   * Example: `"2026-08-01"`
   */
  version?: string | undefined;
}
