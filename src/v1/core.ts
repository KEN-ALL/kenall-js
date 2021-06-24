/*#if _BUNDLE
import 'core-js/features/string/ends-with'; // for SuperStruct on IE11!
import 'core-js/features/string/includes'; // for SuperStruct on IE11!
import 'core-js/features/set'; // for SuperStruct on IE11!
//#endif */
import axios, { AxiosInstance } from 'axios';
import { validate } from 'superstruct-ts-transformer';
import { StructError } from 'superstruct';
import { Config } from '../config';
import {
  AddressResolverResponse,
  AddressSearcherOptions,
  AddressSearcherResponse,
  CityResolverResponse,
} from './interfaces';
const DEFAULT_APIBASE_V1 = 'https://api.kenall.jp/v1';

function normalizePostalCode(postalCode: string): string {
  const match = postalCode.match(/^(\d{3})-(\d{4})$/);
  if (match) {
    return match[1] + match[2];
  }
  return postalCode;
}

export class KENALLV1 {
  private readonly axios: AxiosInstance;
  readonly apibase: string;
  readonly timeout: number;

  /**
   * The constructor.
   *
   * @param apikey The key string that you want to call the API with. The key is
   *               shown in the dashboard you will be navigated to right after
   *               signing in to the service.
   * @param config Specfies the configuration given by {@link Config}.
   */
  constructor(readonly apikey: string, config: Config = {}) {
    this.apibase = config.apibase || DEFAULT_APIBASE_V1;
    this.timeout = config.timeout || 1000;
    this.axios = axios.create({
      baseURL: this.apibase,
      timeout: this.timeout,
      headers: { Authorization: `Token ${this.apikey}` },
    });
  }

  protected async request(endpoint: string, params = {}): Promise<unknown> {
    const r = await this.axios.get(endpoint, { params: params });
    return r.data;
  }

  /**
   * Invokes "getAddress" API (endpoint: `/postalcode/{postalcode}`).
   *
   * @param postalCode The postal code to query with.
   * @param version The version of the database that the query has to be
   *                performed against. Will default to the latest available
   *                version if not specified.
   * @returns An {@link AddressResolverResponse}.
   */
  async getAddress(
    postalCode: string,
    version?: string | undefined
  ): Promise<AddressResolverResponse> {
    try {
      return validate<AddressResolverResponse>(
        await this.request(
          `/postalcode/${normalizePostalCode(postalCode)}`,
          version != undefined ? { version: version } : {}
        )
      );
    } catch (e) {
      if (e instanceof StructError) {
        throw new Error(
          `invalid response payload: ${e.path} must be ${e.type}`
        );
      } else {
        throw e;
      }
    }
  }

  /**
   * Invokes "getCities" API (endpoint: `/cities/{prefectureCode}`).
   *
   * @param prefectureCode The prefecture code to query with.
   * @param version The version of the database that the query has to be
   *                performed against. Will default to the latest available
   *                version if not specified.
   * @returns A {@link CityResolverResponse}.
   */
  async getCities(
    prefectureCode: string,
    version?: string | undefined
  ): Promise<CityResolverResponse> {
    try {
      return validate<CityResolverResponse>(
        await this.request(
          `/cities/${prefectureCode}`,
          version != undefined ? { version: version } : {}
        )
      );
    } catch (e) {
      if (e instanceof StructError) {
        throw new Error(
          `invalid response payload: ${e.path} must be ${e.type}`
        );
      } else {
        throw e;
      }
    }
  }

  /**
   * Invokes "searchAddresses" API (endpoint: `/postalcode/?...`).
   *
   * @param options The query.
   * @returns A {@link AddressSearcherResponse}.
   */
  async searchAddresses(
    options: AddressSearcherOptions
  ): Promise<AddressSearcherResponse> {
    const params: { [k: string]: string } = {};
    if (options.query !== undefined) {
      params['q'] = options.query;
    }
    if (options.offset !== undefined) {
      params['offset'] = String(options.offset | 0);
    }
    if (options.limit !== undefined) {
      params['limit'] = String(options.limit | 0);
    }
    if (options.version !== undefined) {
      params['version'] = options.version;
    }
    if (options.facet !== undefined) {
      params['facet'] = options.facet;
    }
    try {
      return validate<AddressSearcherResponse>(
        await this.request('/postalcode/', params)
      );
    } catch (e) {
      if (e instanceof StructError) {
        throw new Error(
          `invalid response payload: ${e.path} must be ${e.type}`
        );
      } else {
        throw e;
      }
    }
  }
}
