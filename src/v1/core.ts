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
  NTACorporateInfoResolverResponse,
  NTACorporateInfoSearcherOptions,
  NTACorporateInfoSearcherResponse,
} from './interfaces.compatible';
import * as v20220901 from './interfaces.v20220901';
import * as v20221101 from './interfaces.v20221101';

type APIVersion = '2022-09-01' | '2022-11-01';

type AddressResolverResponseForVersion<T extends APIVersion | undefined> =
  T extends undefined
    ? AddressResolverResponse
    : T extends '2022-09-01'
    ? v20220901.AddressResolverResponse
    : T extends '2022-11-01'
    ? v20221101.AddressResolverResponse
    : unknown;

type CityResolverResponseForVersion<T extends APIVersion | undefined> =
  T extends undefined
    ? CityResolverResponse
    : T extends '2022-09-01'
    ? v20220901.CityResolverResponse
    : T extends '2022-11-01'
    ? v20221101.CityResolverResponse
    : unknown;

type AddressSearcherResponseForVersion<T extends APIVersion | undefined> =
  T extends undefined
    ? AddressSearcherResponse
    : T extends '2022-09-01'
    ? v20220901.AddressSearcherResponse
    : T extends '2022-11-01'
    ? v20221101.AddressSearcherResponse
    : unknown;

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

  protected async request(
    endpoint: string,
    params = {},
    apiVersion?: string
  ): Promise<unknown> {
    const r = await this.axios.get(endpoint, {
      params: params,
      headers: { ...(apiVersion ? { 'KenAll-API-Version': apiVersion } : {}) },
    });
    return r.data;
  }

  /**
   * Invokes "getAddress" API (endpoint: `/postalcode/{postalcode}`).
   *
   * @param postalCode The postal code to query with.
   * @param version The version of the database that the query has to be
   *                performed against. Will default to the latest available
   *                version if not specified.
   * @param apiVersion The API version. The return type is determined based
   *                   on this argument, and thus it cannot be a variable.
   * @returns An {@link AddressResolverResponse}.
   */
  async getAddress<T extends APIVersion | undefined>(
    postalCode: string,
    version?: string | undefined,
    apiVersion?: T
  ): Promise<AddressResolverResponseForVersion<T>> {
    const resp = await this.request(
      `/postalcode/${normalizePostalCode(postalCode)}`,
      version != undefined ? { version: version } : {},
      apiVersion
    );
    try {
      if (apiVersion === '2022-11-01') {
        // cope with superstruct-ts-transformer bug
        interface AddressResolverResponseV20221101
          extends v20221101.AddressResolverResponse {}
        return validate<AddressResolverResponseV20221101>(
          resp
        ) as AddressResolverResponseForVersion<T>;
      } else if (apiVersion === '2022-09-01') {
        // cope with superstruct-ts-transformer bug
        interface AddressResolverResponseV20220901
          extends v20220901.AddressResolverResponse {}
        return validate<AddressResolverResponseV20220901>(
          resp
        ) as AddressResolverResponseForVersion<T>;
      } else {
        interface AddressResolverResponseCompat
          extends AddressResolverResponse {}
        return validate<AddressResolverResponseCompat>(
          resp
        ) as AddressResolverResponseForVersion<T>;
      }
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
   * @param apiVersion The API version. The return type is determined based
   *                   on this argument, and thus it cannot be a variable.
   * @returns A {@link CityResolverResponse}.
   */
  async getCities<T extends APIVersion | undefined>(
    prefectureCode: string,
    version?: string | undefined,
    apiVersion?: T
  ): Promise<CityResolverResponseForVersion<T>> {
    const resp = await this.request(
      `/cities/${prefectureCode}`,
      version != undefined ? { version: version } : {},
      apiVersion
    );
    try {
      if (apiVersion === '2022-11-01') {
        // cope with superstruct-ts-transformer bug
        interface CityResolverResponseV20221101
          extends v20221101.CityResolverResponse {}
        return validate<CityResolverResponseV20221101>(
          resp
        ) as CityResolverResponseForVersion<T>;
      } else if (apiVersion === '2022-09-01') {
        // cope with superstruct-ts-transformer bug
        interface CityResolverResponseV20220901
          extends v20220901.CityResolverResponse {}
        return validate<CityResolverResponseV20220901>(
          resp
        ) as CityResolverResponseForVersion<T>;
      } else {
        interface CityResolverResponseCompat extends CityResolverResponse {}
        return validate<CityResolverResponseCompat>(
          resp
        ) as CityResolverResponseForVersion<T>;
      }
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
   * @param apiVersion The API version. The return type is determined based
   *                   on this argument, and thus it cannot be a variable.
   * @returns A {@link AddressSearcherResponse}.
   */
  async searchAddresses<T extends APIVersion | undefined>(
    options: AddressSearcherOptions,
    apiVersion?: T
  ): Promise<AddressSearcherResponseForVersion<T>> {
    const params: { [k: string]: string } = {};
    if (options.q !== undefined) {
      params['q'] = options.q;
    }
    if (options.t !== undefined) {
      params['t'] = options.t;
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
    const resp = await this.request('/postalcode/', params, apiVersion);
    try {
      if (apiVersion === '2022-11-01') {
        // cope with superstruct-ts-transformer bug
        interface AddressSearcherResponseV20221101
          extends v20221101.AddressSearcherResponse {}
        return validate<AddressSearcherResponseV20221101>(
          resp
        ) as AddressSearcherResponseForVersion<T>;
      } else if (apiVersion === '2022-09-01') {
        // cope with superstruct-ts-transformer bug
        interface AddressSearcherResponseV20220901
          extends v20220901.AddressSearcherResponse {}
        return validate<AddressSearcherResponseV20220901>(
          resp
        ) as AddressSearcherResponseForVersion<T>;
      } else {
        type AddressSearcherResponseCompat = AddressSearcherResponse & {
          [key: string]: any;
        };
        return validate<AddressSearcherResponseCompat>(
          resp
        ) as AddressSearcherResponseForVersion<T>;
      }
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
   * Invokes "getNTACorporateInfo" API (endpoint: `/houjinbangou/{corporateNumber}`).
   *
   * @param corporateNumber The corporate number to query with.
   * @returns An {@link NTACorporateInfoResolverResponse}.
   */
  async getNTACorporateInfo(
    corporateNumber: string
  ): Promise<NTACorporateInfoResolverResponse> {
    try {
      return validate<NTACorporateInfoResolverResponse>(
        await this.request(`/houjinbangou/${corporateNumber}`, {})
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
   * Invokes "searchNTACorporateInfo" API (endpoint: `/houjinbangou?...`).
   *
   * @param options The query.
   * @returns A {@link NTACorporateInfoSearcherResponse}.
   */
  async searchNTACorporateInfo(
    options: NTACorporateInfoSearcherOptions
  ): Promise<NTACorporateInfoSearcherResponse> {
    const params: { [k: string]: string } = {};
    if (options.query !== undefined) {
      params['q'] = options.query;
    }
    if (options.mode !== undefined) {
      params['mode'] = options.mode;
    }
    if (options.offset !== undefined) {
      params['offset'] = String(options.offset | 0);
    }
    if (options.limit !== undefined) {
      params['limit'] = String(options.limit | 0);
    }
    if (options.facet_area !== undefined) {
      params['facet_area'] = options.facet_area;
    }
    if (options.facet_kind !== undefined) {
      params['facet_kind'] = options.facet_kind;
    }
    if (options.facet_process !== undefined) {
      params['facet_process'] = options.facet_process;
    }
    if (options.facet_close_cause !== undefined) {
      params['facet_close_cause'] = options.facet_close_cause;
    }
    try {
      return validate<NTACorporateInfoSearcherResponse>(
        await this.request('/houjinbangou', params)
      );
    } catch (e) {
      if (e instanceof StructError) {
        throw new Error(
          `${e}`
          //  `invalid response payload: ${e.path} must be ${e.type}`
        );
      } else {
        throw e;
      }
    }
  }
}
