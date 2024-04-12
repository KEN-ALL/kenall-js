import axios, { AxiosInstance } from 'axios';
import { StructError } from 'superstruct';
import { Config } from '../config';
import {
  AddressSearcherOptions,
  NTACorporateInfoSearcherOptions,
} from './interfaces.compatible';
import {
  APIVersion,
  AddressResolverResponseForVersion,
  AddressSearcherResponseForVersion,
  CityResolverResponseForVersion,
  NTACorporateInfoResolverResponseForVersion,
  NTACorporateInfoSearcherResponseForVersion,
  NTAQualifiedInvoiceIssuerInfoResolverResponseForVersion,
  BanksResponseForVersion,
  BankResolverResponseForVersion,
  BankBranchesResponseForVersion,
  BankBranchResolverResponseForVersion,
  getValidators,
} from './validators';
export type { APIVersion } from './validators';

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
  async getAddress<T extends APIVersion | undefined = undefined>(
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
      return getValidators(apiVersion).validateAddressResolverResponse(
        resp
      ) as AddressResolverResponseForVersion<T>;
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
  async getCities<T extends APIVersion | undefined = undefined>(
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
      return getValidators(apiVersion).validateCityResolverResponse(
        resp
      ) as CityResolverResponseForVersion<T>;
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
   * @returns An {@link AddressSearcherResponse}.
   */
  async searchAddresses<T extends APIVersion | undefined = undefined>(
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
      return getValidators(apiVersion).validateAddressSearcherResponse(
        resp
      ) as AddressSearcherResponseForVersion<T>;
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
   * @param apiVersion The API version. The return type is determined based
   *                   on this argument, and thus it cannot be a variable.
   * @returns An {@link NTACorporateInfoResolverResponse}.
   */
  async getNTACorporateInfo<T extends APIVersion | undefined = undefined>(
    corporateNumber: string,
    apiVersion?: T
  ): Promise<NTACorporateInfoResolverResponseForVersion<T>> {
    try {
      const resp = await this.request(
        `/houjinbangou/${corporateNumber}`,
        {},
        apiVersion
      );
      return getValidators(apiVersion).validateNTACorporateInfoResolverResponse(
        resp
      ) as NTACorporateInfoResolverResponseForVersion<T>;
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
   * @param apiVersion The API version. The return type is determined based
   *                   on this argument, and thus it cannot be a variable.
   * @returns An {@link NTACorporateInfoSearcherResponse}.
   */
  async searchNTACorporateInfo<T extends APIVersion | undefined = undefined>(
    options: NTACorporateInfoSearcherOptions,
    apiVersion?: T
  ): Promise<NTACorporateInfoSearcherResponseForVersion<T>> {
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
      const resp = await this.request('/houjinbangou', params, apiVersion);
      return getValidators(apiVersion).validateNTACorporateInfoSearcherResponse(
        resp
      ) as NTACorporateInfoSearcherResponseForVersion<T>;
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

  /**
   * Invokes "getNTAQualifiedInvoiceIssuerInfo" API (endpoint: `/invoice/{issuerNumber}`).
   *
   * @param issuerNumber The qualified invoice issuer number to query with.
   * @param apiVersion The API version. The return type is determined based
   *                   on this argument, and thus it cannot be a variable.
   * @returns An {@link NTAQualifiedInvoiceIssuerResolverResponse}.
   */
  async getNTAQualifiedInvoiceIssuerInfo<
    T extends APIVersion | undefined = undefined
  >(
    issuerNumber: string,
    apiVersion?: T
  ): Promise<NTAQualifiedInvoiceIssuerInfoResolverResponseForVersion<T>> {
    try {
      const resp = await this.request(
        `/invoice/${issuerNumber}`,
        {},
        apiVersion
      );
      return getValidators(
        apiVersion
      ).validateNTAQualifiedInvoiceIssuerInfoResolverResponse(
        resp
      ) as NTAQualifiedInvoiceIssuerInfoResolverResponseForVersion<T>;
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
   * Invokes "getBanks" API (endpoint: `/bank`).
   *
   * @param apiVersion The API version. The return type is determined based
   *                  on this argument, and thus it cannot be a variable.
   * @returns A {@link BanksResponse}.
   */
  async getBanks<T extends APIVersion | undefined = undefined>(
    apiVersion?: T
  ): Promise<BanksResponseForVersion<T>> {
    try {
      const resp = await this.request('/bank', {}, apiVersion);
      return getValidators(apiVersion).validateBanksResponse(
        resp
      ) as BanksResponseForVersion<T>;
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
   * Invokes "getBank" API (endpoint: `/bank/{bankCode}`).
   *
   * @param bankCode The bank code to query with.
   * @param apiVersion The API version. The return type is determined based
   *                 on this argument, and thus it cannot be a variable.
   * @returns A {@link BankResolverResponse}.
   */
  async getBank<T extends APIVersion | undefined = undefined>(
    bankCode: string,
    apiVersion?: T
  ): Promise<BankResolverResponseForVersion<T>> {
    try {
      const resp = await this.request(`/bank/${bankCode}`, {}, apiVersion);
      return getValidators(apiVersion).validateBankResolverResponse(
        resp
      ) as BankResolverResponseForVersion<T>;
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
   * Invokes "getBankBranch" API (endpoint: `/bank/{bankCode}/branches`).
   *
   * @param bankCode The bank code to query with.
   * @param apiVersion The API version. The return type is determined based
   *                on this argument, and thus it cannot be a variable.
   * @returns A {@link BankBranchesResponseForVersion}.
   */
  async getBankBranches<T extends APIVersion | undefined = undefined>(
    bankCode: string,
    apiVersion?: T
  ): Promise<BankBranchesResponseForVersion<T>> {
    try {
      const resp = await this.request(
        `/bank/${bankCode}/branches`,
        {},
        apiVersion
      );
      return getValidators(apiVersion).validateBankBranchesResponse(
        resp
      ) as BankBranchesResponseForVersion<T>;
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
   * Invokes "getBankBranch" API (endpoint: `/bank/{bankCode}/branches/{branchCode}`).
   *
   * @param bankCode The bank code to query with.
   * @param branchCode The branch code to query with.
   * @param apiVersion The API version. The return type is determined based
   *               on this argument, and thus it cannot be a variable.
   * @returns A {@link BankBranchResolverResponseForVersion}.
   */
  async getBankBranch<T extends APIVersion | undefined = undefined>(
    bankCode: string,
    branchCode: string,
    apiVersion?: T
  ): Promise<BankBranchResolverResponseForVersion<T>> {
    try {
      const resp = await this.request(
        `/bank/${bankCode}/branches/${branchCode}`,
        {},
        apiVersion
      );
      return getValidators(apiVersion).validateBankBranchResolverResponse(
        resp
      ) as BankBranchResolverResponseForVersion<T>;
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
