import axios, { AxiosInstance } from 'axios';
import { validate } from 'superstruct-ts-transformer';
import { StructError } from 'superstruct';
import { Config } from '../config';
import { AddressResolverResponse } from '../interfaces';
const DEFAULT_APIBASE_V1 = 'https://api.kenall.jp/v1';

export class KENALLV1 {
  private readonly axios: AxiosInstance;
  readonly apibase: string;
  readonly timeout: number;

  constructor(
    readonly apikey: string,
    config: Config = {},
  ) {
    this.apibase = config.apibase || DEFAULT_APIBASE_V1;
    this.timeout = config.timeout || 1000;
    this.axios = axios.create({
      baseURL: this.apibase,
      timeout: this.timeout,
      headers: {'Authorization': `Token ${this.apikey}`}
    });
  }

  async request(endpoint: string, params = {}): Promise<object> {
    const r = await this.axios.get(endpoint, {params: params});
    return r.data;
  }

  async get(postal_code: string, version?: string): Promise<AddressResolverResponse> {
    try {
      return validate<AddressResolverResponse>(
        await this.request(
          `/postalcode/${postal_code}`,
          {
            version: version,
          }
        )
       );
    } catch (e) {
      if (e instanceof StructError) {
        throw new Error(`invalid response payload: ${e.path} must be ${e.type}`);
      } else {
        throw e;
      }
    }
  }
}

export const KENALL = KENALLV1;