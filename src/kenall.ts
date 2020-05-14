import axios, { AxiosInstance } from 'axios';

// interface FieldArgs {
//   zip?: string
//   pref?: string
// }

interface Config {
  apibase?: string
  timeout?: number
}

export class KEN_ALL {

  private axios: AxiosInstance | null = null;

  constructor(
    readonly apikey: string,
    readonly config: Config = {}
  ) {
    this.axios = axios.create({
      baseURL: this.apibase,
      timeout: this.timeout,
      headers: {'Authorization': `Token ${this.apikey}`}
    });
  }

  get apibase(): string {
      return this.config.apibase || 'https://kenall.jp';
  }

  get timeout(): number {
    return this.config.timeout || 1000;
  }

  async request(endpoint: string, params = {}) {
    try {
      const r = await this.axios!.get(`${this.apibase}/api${endpoint}`, {
        params: params
      });
      return r.data;
    } catch (e) {
      console.error(e);
    }
  }

  get(postal_code: string) {
    return this.request(`/postalcode/${postal_code}`)
  }
}
