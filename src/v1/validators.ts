import type * as _compatible from './interfaces.compatible';
import type * as _v20220901 from './interfaces.v20220901';
import type * as _v20221101 from './interfaces.v20221101';
import type * as _v20230901 from './interfaces.v20230901';
import type * as _v20240101 from './interfaces.v20240101';
import type * as _v20250101 from './interfaces.v20250101';
import { ZodError } from 'zod';
import * as compatibleS from './schemas.compatible';
import * as v20220901S from './schemas.v20220901';
import * as v20221101S from './schemas.v20221101';
import * as v20230901S from './schemas.v20230901';
import * as v20240101S from './schemas.v20240101';
import * as v20250101S from './schemas.v20250101';

export type APIVersion =
  | '2022-09-01'
  | '2022-11-01'
  | '2023-09-01'
  | '2024-01-01'
  | '2025-01-01';

export type AddressResolverResponseForVersion<
  T extends APIVersion | undefined,
> = T extends '2022-09-01'
  ? _v20220901.AddressResolverResponse
  : T extends '2022-11-01'
    ? _v20221101.AddressResolverResponse
    : T extends '2023-09-01'
      ? _v20230901.AddressResolverResponse
      : T extends '2024-01-01'
        ? _v20240101.AddressResolverResponse
        : T extends '2025-01-01'
          ? _v20250101.AddressResolverResponse
          : _compatible.AddressResolverResponse;

export type CityResolverResponseForVersion<T extends APIVersion | undefined> =
  T extends '2022-09-01'
    ? _v20220901.CityResolverResponse
    : T extends '2022-11-01'
      ? _v20221101.CityResolverResponse
      : T extends '2023-09-01'
        ? _v20230901.CityResolverResponse
        : T extends '2024-01-01'
          ? _v20240101.CityResolverResponse
          : T extends '2025-01-01'
            ? _v20250101.CityResolverResponse
            : _compatible.CityResolverResponse;

export type AddressSearcherResponseForVersion<
  T extends APIVersion | undefined,
> = T extends '2022-09-01'
  ? _v20220901.AddressSearcherResponse
  : T extends '2022-11-01'
    ? _v20221101.AddressSearcherResponse
    : T extends '2023-09-01'
      ? _v20230901.AddressSearcherResponse
      : T extends '2024-01-01'
        ? _v20240101.AddressSearcherResponse
        : T extends '2025-01-01'
          ? _v20250101.AddressSearcherResponse
          : _compatible.AddressSearcherResponse;

export type NTACorporateInfoResolverResponseForVersion<
  T extends APIVersion | undefined,
> = T extends '2022-09-01'
  ? _v20220901.NTACorporateInfoResolverResponse
  : T extends '2022-11-01'
    ? _v20221101.NTACorporateInfoResolverResponse
    : T extends '2023-09-01'
      ? _v20230901.NTACorporateInfoResolverResponse
      : T extends '2024-01-01'
        ? _v20240101.NTACorporateInfoResolverResponse
        : T extends '2025-01-01'
          ? _v20250101.NTACorporateInfoResolverResponse
          : _compatible.NTACorporateInfoResolverResponse;

export type NTACorporateInfoSearcherResponseForVersion<
  T extends APIVersion | undefined,
> = T extends '2022-09-01'
  ? _v20220901.NTACorporateInfoSearcherResponse
  : T extends '2022-11-01'
    ? _v20221101.NTACorporateInfoSearcherResponse
    : T extends '2023-09-01'
      ? _v20230901.NTACorporateInfoSearcherResponse
      : T extends '2024-01-01'
        ? _v20240101.NTACorporateInfoSearcherResponse
        : T extends '2025-01-01'
          ? _v20250101.NTACorporateInfoSearcherResponse
          : _compatible.NTACorporateInfoSearcherResponse;

export type NTAQualifiedInvoiceIssuerInfoResolverResponseForVersion<
  T extends APIVersion | undefined,
> = T extends '2024-01-01'
  ? _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse
  : T extends '2025-01-01'
    ? _v20250101.NTAQualifiedInvoiceIssuerInfoResolverResponse
    : _compatible.NTAQualifiedInvoiceIssuerInfoResolverResponse;

export type BanksResponseForVersion<T extends APIVersion | undefined> =
  T extends '2023-09-01'
    ? _v20230901.BanksResponse
    : T extends '2024-01-01'
      ? _v20240101.BanksResponse
      : T extends '2025-01-01'
        ? _v20250101.BanksResponse
        : _compatible.BanksResponse;

export type BankResolverResponseForVersion<T extends APIVersion | undefined> =
  T extends '2023-09-01'
    ? _v20230901.BankResolverResponse
    : T extends '2024-01-01'
      ? _v20240101.BankResolverResponse
      : T extends '2025-01-01'
        ? _v20250101.BankResolverResponse
        : _compatible.BankResolverResponse;

export type BankBranchesResponseForVersion<T extends APIVersion | undefined> =
  T extends '2023-09-01'
    ? _v20230901.BankBranchesResponse
    : T extends '2024-01-01'
      ? _v20240101.BankBranchesResponse
      : T extends '2025-01-01'
        ? _v20250101.BankBranchesResponse
        : _compatible.BankBranchesResponse;

export type BankBranchResolverResponseForVersion<
  T extends APIVersion | undefined,
> = T extends '2023-09-01'
  ? _v20230901.BankBranchResolverResponse
  : T extends '2024-01-01'
    ? _v20240101.BankBranchResolverResponse
    : T extends '2025-01-01'
      ? _v20250101.BankBranchResolverResponse
      : _compatible.BankBranchResolverResponse;

export type Validators<T extends APIVersion | undefined> = {
  validateAddressResolverResponse: (
    payload: unknown
  ) => AddressResolverResponseForVersion<T>;
  validateCityResolverResponse: (
    payload: unknown
  ) => CityResolverResponseForVersion<T>;
  validateAddressSearcherResponse: (
    payload: unknown
  ) => AddressSearcherResponseForVersion<T>;
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ) => NTACorporateInfoResolverResponseForVersion<T>;
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ) => NTACorporateInfoSearcherResponseForVersion<T>;
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ) => NTAQualifiedInvoiceIssuerInfoResolverResponseForVersion<T>;
  validateBanksResponse: (payload: unknown) => BanksResponseForVersion<T>;
  validateBankResolverResponse: (
    payload: unknown
  ) => BankResolverResponseForVersion<T>;
  validateBankBranchesResponse: (
    payload: unknown
  ) => BankBranchesResponseForVersion<T>;
  validateBankBranchResolverResponse: (
    payload: unknown
  ) => BankBranchResolverResponseForVersion<T>;
};

const refillToCompatibleNTACorporateInfo = (
  data: _v20240101.NTACorporateInfo | _v20250101.NTACorporateInfo
): _v20220901.NTACorporateInfo => ({
  published_date: data.published_date,
  sequence_number: String(data.sequence_number),
  corporate_number: data.corporate_number,
  process: String(data.process) as _v20220901.NTACorporateInfoProcess,
  correct: String(data.correct),
  update_date: data.update_date,
  change_date: data.change_date,
  name: data.name,
  name_image_id: data.name_image_id,
  kind: String(data.kind) as _v20220901.NTACorporateInfoKind,
  prefecture_name: data.address.prefecture,
  city_name: data.address.city,
  street_number: data.address.street_number,
  town: data.address.town,
  kyoto_street: data.address.kyoto_street,
  block_lot_num: data.address.block_lot_num,
  building: data.address.building,
  floor_room: data.address.floor_room,
  address_image_id: data.address_image_id,
  jisx0402: data.address.jisx0402,
  post_code: data.address.postal_code,
  address_outside: data.address_outside,
  address_outside_image_id: data.address_outside_image_id,
  close_date: data.close_date,
  close_cause:
    data.close_cause == null
      ? null
      : (String(data.close_cause) as _v20220901.NTACorporateInfoCloseCause),
  successor_corporate_number: data.successor_corporate_number,
  change_cause: data.change_cause,
  assignment_date: data.assignment_date,
  en_name: data.en_name,
  en_prefecture_name: data.address.prefecture_roman,
  en_address_line: data.en_address_line,
  en_address_outside: data.en_address_outside,
  furigana: data.furigana,
  hihyoji: String(data.hihyoji),
});

export const compatible = {
  validateAddressResolverResponse: (
    payload: unknown
  ): _compatible.AddressResolverResponse =>
    compatibleS.addressResolverResponseSchema.parse(payload),
  validateCityResolverResponse: (
    payload: unknown
  ): _compatible.CityResolverResponse =>
    compatibleS.cityResolverResponseSchema.parse(payload),
  validateAddressSearcherResponse: (
    payload: unknown
  ): _compatible.AddressSearcherResponse =>
    compatibleS.addressSearcherResponseSchema.parse(payload),
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ): _compatible.NTACorporateInfoResolverResponse => {
    try {
      return v20230901S.ntaCorporateInfoResolverResponseSchema.parse(payload);
    } catch (e) {
      if (!(e instanceof ZodError)) {
        throw e;
      }
    }
    try {
      const data =
        v20240101S.ntaCorporateInfoResolverResponseSchema.parse(payload);
      return {
        version: data.version,
        data: refillToCompatibleNTACorporateInfo(data.data),
      };
    } catch (e) {
      if (!(e instanceof ZodError)) {
        throw e;
      }
    }
    const data =
      v20250101S.ntaCorporateInfoResolverResponseSchema.parse(payload);
    return {
      version: data.version,
      data: refillToCompatibleNTACorporateInfo(data.data),
    };
  },
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ): _compatible.NTACorporateInfoSearcherResponse => {
    try {
      return v20230901S.ntaCorporateInfoSearcherResponseSchema.parse(payload);
    } catch (e) {
      if (!(e instanceof ZodError)) {
        throw e;
      }
    }
    try {
      const data =
        v20240101S.ntaCorporateInfoSearcherResponseSchema.parse(payload);
      return {
        version: data.version,
        query: data.query,
        count: data.count,
        offset: data.offset,
        limit: data.limit,
        facets: data.facets,
        data: data.data.map(refillToCompatibleNTACorporateInfo),
      };
    } catch (e) {
      if (!(e instanceof ZodError)) {
        throw e;
      }
    }
    const data =
      v20250101S.ntaCorporateInfoSearcherResponseSchema.parse(payload);
    return {
      version: data.version,
      query: data.query,
      count: data.count,
      offset: data.offset,
      limit: data.limit,
      facets: data.facets,
      data: data.data.map(refillToCompatibleNTACorporateInfo),
    };
  },
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ): _compatible.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
    v20240101S.ntaQualifiedInvoiceIssuerInfoResolverResponseSchema.parse(
      payload
    ),
  validateBanksResponse: (payload: unknown): _compatible.BanksResponse =>
    v20230901S.banksResponseSchema.parse(payload),
  validateBankResolverResponse: (
    payload: unknown
  ): _compatible.BankResolverResponse =>
    v20230901S.bankResolverResponseSchema.parse(payload),
  validateBankBranchesResponse: (
    payload: unknown
  ): _compatible.BankBranchesResponse =>
    v20230901S.bankBranchesResponseSchema.parse(payload),
  validateBankBranchResolverResponse: (
    payload: unknown
  ): _compatible.BankBranchResolverResponse =>
    v20230901S.bankBranchResolverResponseSchema.parse(payload),
};

export const v20220901 = {
  validateAddressResolverResponse: (
    payload: unknown
  ): _v20220901.AddressResolverResponse =>
    v20220901S.addressResolverResponseSchema.parse(payload),
  validateCityResolverResponse: (
    payload: unknown
  ): _v20220901.CityResolverResponse =>
    v20220901S.cityResolverResponseSchema.parse(payload),
  validateAddressSearcherResponse: (
    payload: unknown
  ): _v20220901.AddressSearcherResponse =>
    v20220901S.addressSearcherResponseSchema.parse(payload),
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ): _v20220901.NTACorporateInfoResolverResponse =>
    v20220901S.ntaCorporateInfoResolverResponseSchema.parse(payload),
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ): _v20220901.NTACorporateInfoSearcherResponse =>
    v20220901S.ntaCorporateInfoSearcherResponseSchema.parse(payload),
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ): _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
    v20240101S.ntaQualifiedInvoiceIssuerInfoResolverResponseSchema.parse(
      payload
    ),
  validateBanksResponse: (payload: unknown): _v20230901.BanksResponse =>
    v20230901S.banksResponseSchema.parse(payload),
  validateBankResolverResponse: (
    payload: unknown
  ): _v20230901.BankResolverResponse =>
    v20230901S.bankResolverResponseSchema.parse(payload),
  validateBankBranchesResponse: (
    payload: unknown
  ): _v20230901.BankBranchesResponse =>
    v20230901S.bankBranchesResponseSchema.parse(payload),
  validateBankBranchResolverResponse: (
    payload: unknown
  ): _v20230901.BankBranchResolverResponse =>
    v20230901S.bankBranchResolverResponseSchema.parse(payload),
};

export const v20221101 = {
  validateAddressResolverResponse: (
    payload: unknown
  ): _v20221101.AddressResolverResponse =>
    v20221101S.addressResolverResponseSchema.parse(payload),
  validateCityResolverResponse: (
    payload: unknown
  ): _v20221101.CityResolverResponse =>
    v20221101S.cityResolverResponseSchema.parse(payload),
  validateAddressSearcherResponse: (
    payload: unknown
  ): _v20221101.AddressSearcherResponse =>
    v20221101S.addressSearcherResponseSchema.parse(payload),
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ): _v20221101.NTACorporateInfoResolverResponse =>
    v20221101S.ntaCorporateInfoResolverResponseSchema.parse(payload),
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ): _v20221101.NTACorporateInfoSearcherResponse =>
    v20221101S.ntaCorporateInfoSearcherResponseSchema.parse(payload),
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ): _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
    v20240101S.ntaQualifiedInvoiceIssuerInfoResolverResponseSchema.parse(
      payload
    ),
  validateBanksResponse: (payload: unknown): _v20230901.BanksResponse =>
    v20230901S.banksResponseSchema.parse(payload),
  validateBankResolverResponse: (
    payload: unknown
  ): _v20230901.BankResolverResponse =>
    v20230901S.bankResolverResponseSchema.parse(payload),
  validateBankBranchesResponse: (
    payload: unknown
  ): _v20230901.BankBranchesResponse =>
    v20230901S.bankBranchesResponseSchema.parse(payload),
  validateBankBranchResolverResponse: (
    payload: unknown
  ): _v20230901.BankBranchResolverResponse =>
    v20230901S.bankBranchResolverResponseSchema.parse(payload),
};

export const v20230901 = {
  validateAddressResolverResponse: (
    payload: unknown
  ): _v20230901.AddressResolverResponse =>
    v20230901S.addressResolverResponseSchema.parse(payload),
  validateCityResolverResponse: (
    payload: unknown
  ): _v20230901.CityResolverResponse =>
    v20230901S.cityResolverResponseSchema.parse(payload),
  validateAddressSearcherResponse: (
    payload: unknown
  ): _v20230901.AddressSearcherResponse =>
    v20230901S.addressSearcherResponseSchema.parse(payload),
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ): _v20230901.NTACorporateInfoResolverResponse =>
    v20230901S.ntaCorporateInfoResolverResponseSchema.parse(payload),
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ): _v20230901.NTACorporateInfoSearcherResponse =>
    v20230901S.ntaCorporateInfoSearcherResponseSchema.parse(payload),
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ): _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
    v20240101S.ntaQualifiedInvoiceIssuerInfoResolverResponseSchema.parse(
      payload
    ),
  validateBanksResponse: (payload: unknown): _v20230901.BanksResponse =>
    v20230901S.banksResponseSchema.parse(payload),
  validateBankResolverResponse: (
    payload: unknown
  ): _v20230901.BankResolverResponse =>
    v20230901S.bankResolverResponseSchema.parse(payload),
  validateBankBranchesResponse: (
    payload: unknown
  ): _v20230901.BankBranchesResponse =>
    v20230901S.bankBranchesResponseSchema.parse(payload),
  validateBankBranchResolverResponse: (
    payload: unknown
  ): _v20230901.BankBranchResolverResponse =>
    v20230901S.bankBranchResolverResponseSchema.parse(payload),
};

export const v20240101 = {
  validateAddressResolverResponse: (
    payload: unknown
  ): _v20240101.AddressResolverResponse =>
    v20240101S.addressResolverResponseSchema.parse(payload),
  validateCityResolverResponse: (
    payload: unknown
  ): _v20240101.CityResolverResponse =>
    v20240101S.cityResolverResponseSchema.parse(payload),
  validateAddressSearcherResponse: (
    payload: unknown
  ): _v20240101.AddressSearcherResponse =>
    v20240101S.addressSearcherResponseSchema.parse(payload),
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ): _v20240101.NTACorporateInfoResolverResponse =>
    v20240101S.ntaCorporateInfoResolverResponseSchema.parse(payload),
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ): _v20240101.NTACorporateInfoSearcherResponse =>
    v20240101S.ntaCorporateInfoSearcherResponseSchema.parse(payload),
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ): _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
    v20240101S.ntaQualifiedInvoiceIssuerInfoResolverResponseSchema.parse(
      payload
    ),
  validateBanksResponse: (payload: unknown): _v20240101.BanksResponse =>
    v20240101S.banksResponseSchema.parse(payload),
  validateBankResolverResponse: (
    payload: unknown
  ): _v20240101.BankResolverResponse =>
    v20240101S.bankResolverResponseSchema.parse(payload),
  validateBankBranchesResponse: (
    payload: unknown
  ): _v20240101.BankBranchesResponse =>
    v20240101S.bankBranchesResponseSchema.parse(payload),
  validateBankBranchResolverResponse: (
    payload: unknown
  ): _v20240101.BankBranchResolverResponse =>
    v20240101S.bankBranchResolverResponseSchema.parse(payload),
};

export const v20250101 = {
  validateAddressResolverResponse: (
    payload: unknown
  ): _v20250101.AddressResolverResponse =>
    v20250101S.addressResolverResponseSchema.parse(payload),
  validateCityResolverResponse: (
    payload: unknown
  ): _v20250101.CityResolverResponse =>
    v20250101S.cityResolverResponseSchema.parse(payload),
  validateAddressSearcherResponse: (
    payload: unknown
  ): _v20250101.AddressSearcherResponse =>
    v20250101S.addressSearcherResponseSchema.parse(payload),
  validateNTACorporateInfoResolverResponse: (
    payload: unknown
  ): _v20250101.NTACorporateInfoResolverResponse =>
    v20250101S.ntaCorporateInfoResolverResponseSchema.parse(payload),
  validateNTACorporateInfoSearcherResponse: (
    payload: unknown
  ): _v20250101.NTACorporateInfoSearcherResponse =>
    v20250101S.ntaCorporateInfoSearcherResponseSchema.parse(payload),
  validateNTAQualifiedInvoiceIssuerInfoResolverResponse: (
    payload: unknown
  ): _v20250101.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
    v20250101S.ntaQualifiedInvoiceIssuerInfoResolverResponseSchema.parse(
      payload
    ),
  validateBanksResponse: (payload: unknown): _v20250101.BanksResponse =>
    v20250101S.banksResponseSchema.parse(payload),
  validateBankResolverResponse: (
    payload: unknown
  ): _v20250101.BankResolverResponse =>
    v20250101S.bankResolverResponseSchema.parse(payload),
  validateBankBranchesResponse: (
    payload: unknown
  ): _v20250101.BankBranchesResponse =>
    v20250101S.bankBranchesResponseSchema.parse(payload),
  validateBankBranchResolverResponse: (
    payload: unknown
  ): _v20250101.BankBranchResolverResponse =>
    v20250101S.bankBranchResolverResponseSchema.parse(payload),
};

export const getValidators = <T extends APIVersion | undefined>(
  version: T
): Validators<T> => {
  if (version === '2022-09-01') {
    return v20220901 as Validators<T>;
  }
  if (version === '2022-11-01') {
    return v20221101 as Validators<T>;
  }
  if (version === '2023-09-01') {
    return v20230901 as Validators<T>;
  }
  if (version === '2024-01-01') {
    return v20240101 as Validators<T>;
  }
  if (version === '2025-01-01') {
    return v20250101 as Validators<T>;
  }
  return compatible as Validators<T>;
};
