export interface Config {
  /**
   * Specifies the API endpoint's base URL.
   * The base URL defaults to `https://api.kenall.jp/v1`.
   */
  readonly apibase?: string;

  /**
   * Specifies the timeout value for API requests.
   * It defaults to 1000ms (1 second) when unspecified.
   */
  readonly timeout?: number;
}
