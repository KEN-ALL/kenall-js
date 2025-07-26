const mergeHeaders = (...args: (HeadersInit | undefined)[]) => {
  const headers: [string, string][] = [];
  for (const arg of args) {
    if (arg === undefined) {
      continue;
    }
    if (Array.isArray(arg)) {
      headers.push(...arg);
    } else if (arg instanceof Headers) {
      headers.push(...arg.entries());
    } else {
      headers.push(...Object.entries(arg));
    }
  }
  return headers;
};

const mergeQueryParams = (
  ...args: (
    | Record<string, string>
    | [string, string][]
    | FormData
    | URLSearchParams
  )[]
) => {
  const params = new URLSearchParams();
  for (const arg of args) {
    if (arg === undefined) {
      continue;
    }
    if (arg instanceof URLSearchParams) {
      for (const [key, value] of arg.entries()) {
        params.append(key, value);
      }
    } else if (arg instanceof FormData) {
      for (const [key, value] of arg.entries()) {
        if (typeof value === 'string') {
          params.append(key, value);
        }
      }
    } else if (Array.isArray(arg)) {
      for (const [key, value] of arg) {
        params.append(key, value);
      }
    } else {
      for (const [key, value] of Object.entries(arg)) {
        params.append(key, String(value));
      }
    }
  }
  return params;
};

const isAbsoluteURL = (url: string): boolean => {
  const m = /^(?:[A-Za-z][0-9A-Za-z+.-]*:)?(\/\/|\/(?!\/)|[^/?#;])/.exec(url);
  if (m === null) {
    return false;
  }
  return m[1] === '//' || m[1] === '/';
};

const rebaseURL = (url: string | URL, base: string | URL): URL => {
  let base_ = typeof base === 'string' ? new URL(base) : base;
  if (typeof url === 'string') {
    if (!isAbsoluteURL(url) && !base_.pathname.endsWith('/')) {
      if (base_ === base) {
        base_ = new URL(base_);
      }
      base_.pathname += '/';
    }
  } else {
    if (!isAbsoluteURL(url.href) && !base_.pathname.endsWith('/')) {
      if (base_ === base) {
        base_ = new URL(base_);
      }
      base_.pathname += '/';
    }
  }
  return new URL(url, base_);
};

const buildURLSearchParams = (
  params:
    | Record<string, string>
    | [string, string][]
    | FormData
    | URLSearchParams
): URLSearchParams => {
  if (params instanceof URLSearchParams) {
    return params;
  } else if (params instanceof FormData) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of params.entries()) {
      if (typeof value === 'string') {
        searchParams.append(key, value);
      }
    }
    return searchParams;
  } else if (Array.isArray(params)) {
    return new URLSearchParams(params);
  } else {
    return new URLSearchParams(Object.entries(params));
  }
};

export type RequestInitWithAuxiliaryOptions = RequestInit & {
  params?:
    | Record<string, string>
    | [string, string][]
    | FormData
    | URLSearchParams;
};

export type RequestAugmentation = {
  baseURL?: string | URL;
  timeout?: number;
  headers?: HeadersInit;
  throwErrorsForNon2xx?: boolean;
};

export const buildAugmentedFetch =
  ({ baseURL, timeout, headers, throwErrorsForNon2xx }: RequestAugmentation) =>
  async (input: RequestInfo | URL, init?: RequestInitWithAuxiliaryOptions) => {
    const controller = new AbortController();
    const init_ = {
      ...(init ?? {}),
      headers: mergeHeaders(headers, init?.headers),
      signal: controller.signal,
    };
    let t: unknown | undefined = undefined;
    if (timeout !== undefined) {
      t = setTimeout(() => controller.abort('timed out'), timeout) as unknown;
    }
    const inputURL =
      typeof input === 'string' || input instanceof URL ? input : input.url;
    const finalURL: URL | string = (() => {
      if (init_.params !== undefined) {
        const finalURL =
          baseURL !== undefined
            ? rebaseURL(inputURL, baseURL)
            : new URL(inputURL);
        finalURL.search = String(
          mergeQueryParams(
            init_.params instanceof URLSearchParams
              ? init_.params
              : buildURLSearchParams(init_.params),
            finalURL.searchParams
          )
        );
        return finalURL;
      } else {
        return baseURL !== undefined ? rebaseURL(inputURL, baseURL) : inputURL;
      }
    })();
    const req =
      typeof input === 'string' || input instanceof URL
        ? new Request(finalURL, init_)
        : new Request(finalURL, {
            ...input,
            ...init_,
            headers: mergeHeaders(init_.headers, input.headers),
          });
    try {
      const resp = await fetch(req);
      if (!resp.ok && throwErrorsForNon2xx) {
        const e = new Error(`HTTP error ${resp.status}: ${resp.statusText}`);
        (e as unknown as { response?: Response }).response = resp;
        throw e;
      }
      return resp;
    } finally {
      if (t !== undefined) {
        clearTimeout(t as number);
      }
    }
  };
