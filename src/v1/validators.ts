/*#if _BUNDLE
import 'core-js/features/string/ends-with'; // for SuperStruct on IE11!
import 'core-js/features/string/includes'; // for SuperStruct on IE11!
import 'core-js/features/set'; // for SuperStruct on IE11!
//#endif */
import { validate } from 'superstruct-ts-transformer';
import * as _compatible from './interfaces.compatible';
import * as _v20220901 from './interfaces.v20220901';
import * as _v20221101 from './interfaces.v20221101';
import * as _v20230901 from './interfaces.v20230901';
import * as _v20240101 from './interfaces.v20240101';
import { StructError } from 'superstruct';

export type APIVersion =
  | '2022-09-01'
  | '2022-11-01'
  | '2023-09-01'
  | '2024-01-01';

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
        : _compatible.NTACorporateInfoSearcherResponse;

export type NTAQualifiedInvoiceIssuerInfoResolverResponseForVersion<
  _ extends APIVersion | undefined, // eslint-disable-line @typescript-eslint/no-unused-vars
> = _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse;

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
};

interface NTACorporateInfoResolverResponse_v20240101 // eslint-disable-line @typescript-eslint/no-empty-interface
  extends _v20240101.NTACorporateInfoResolverResponse {}

interface NTACorporateInfoSearcherResponse_v20240101 // eslint-disable-line @typescript-eslint/no-empty-interface
  extends _v20240101.NTACorporateInfoSearcherResponse {}

interface NTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101 // eslint-disable-line @typescript-eslint/no-empty-interface
  extends _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse {}

const _validateNTACorporateInfoResolverResponse_v20240101 = (
  payload: unknown
): _v20240101.NTACorporateInfoResolverResponse =>
  validate<NTACorporateInfoResolverResponse_v20240101>(payload);

const _validateNTACorporateInfoSearcherResponse_v20240101 = (
  payload: unknown
): _v20240101.NTACorporateInfoSearcherResponse =>
  validate<NTACorporateInfoSearcherResponse_v20240101>(payload);

const _validateNTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101 = (
  payload: unknown
): _v20240101.NTAQualifiedInvoiceIssuerInfoResolverResponse =>
  validate<NTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101>(payload);

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace compatible {
  interface AddressResolverResponse_compatible // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _compatible.AddressResolverResponse {}
  interface CityResolverResponse_compatible // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _compatible.CityResolverResponse {}
  interface AddressSearcherResponse_compatible // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _compatible.AddressSearcherResponse {}
  interface NTACorporateInfoResolverResponse_compatible // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _compatible.NTACorporateInfoResolverResponse {}
  interface NTACorporateInfoSearcherResponse_compatible // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _compatible.NTACorporateInfoSearcherResponse {}

  const refillToCompatibleNTACorporateInfo = (
    data: _v20240101.NTACorporateInfo
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

  export const validateAddressResolverResponse = (
    payload: unknown
  ): _compatible.AddressResolverResponse =>
    validate<AddressResolverResponse_compatible>(payload);

  export const validateCityResolverResponse = (
    payload: unknown
  ): _compatible.CityResolverResponse =>
    validate<CityResolverResponse_compatible>(payload);

  export const validateAddressSearcherResponse = (
    payload: unknown
  ): _compatible.AddressSearcherResponse =>
    validate<AddressSearcherResponse_compatible>(payload);

  export const validateNTACorporateInfoResolverResponse = (
    payload: unknown
  ): _compatible.NTACorporateInfoResolverResponse => {
    try {
      return validate<NTACorporateInfoResolverResponse_compatible>(payload);
    } catch (e) {
      if (!(e instanceof StructError)) {
        throw e;
      }
      const data = _validateNTACorporateInfoResolverResponse_v20240101(payload);
      return {
        version: data.version,
        data: refillToCompatibleNTACorporateInfo(data.data),
      };
    }
  };

  export const validateNTACorporateInfoSearcherResponse = (
    payload: unknown
  ): _compatible.NTACorporateInfoSearcherResponse => {
    try {
      return validate<NTACorporateInfoSearcherResponse_compatible>(payload);
    } catch (e) {
      if (!(e instanceof StructError)) {
        throw e;
      }
      const data = _validateNTACorporateInfoSearcherResponse_v20240101(payload);
      return {
        version: data.version,
        query: data.query,
        count: data.count,
        offset: data.offset,
        limit: data.limit,
        facets: data.facets,
        data: data.data.map(refillToCompatibleNTACorporateInfo),
      };
    }
  };

  export const validateNTAQualifiedInvoiceIssuerInfoResolverResponse =
    _validateNTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace v20220901 {
  interface AddressResolverResponse_v20220901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20220901.AddressResolverResponse {}
  interface CityResolverResponse_v20220901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20220901.CityResolverResponse {}
  interface AddressSearcherResponse_v20220901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20220901.AddressSearcherResponse {}
  interface NTACorporateInfoResolverResponse_v20220901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20220901.NTACorporateInfoResolverResponse {}
  interface NTACorporateInfoSearcherResponse_v20220901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20220901.NTACorporateInfoSearcherResponse {}

  export const validateAddressResolverResponse = (
    payload: unknown
  ): _v20220901.AddressResolverResponse =>
    validate<AddressResolverResponse_v20220901>(payload);

  export const validateCityResolverResponse = (
    payload: unknown
  ): _v20220901.CityResolverResponse =>
    validate<CityResolverResponse_v20220901>(payload);

  export const validateAddressSearcherResponse = (
    payload: unknown
  ): _v20220901.AddressSearcherResponse =>
    validate<AddressSearcherResponse_v20220901>(payload);

  export const validateNTACorporateInfoResolverResponse = (
    payload: unknown
  ): _v20220901.NTACorporateInfoResolverResponse =>
    validate<NTACorporateInfoResolverResponse_v20220901>(payload);

  export const validateNTACorporateInfoSearcherResponse = (
    payload: unknown
  ): _v20220901.NTACorporateInfoSearcherResponse =>
    validate<NTACorporateInfoSearcherResponse_v20220901>(payload);

  export const validateNTAQualifiedInvoiceIssuerInfoResolverResponse =
    _validateNTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace v20221101 {
  interface AddressResolverResponse_v20221101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20221101.AddressResolverResponse {}
  interface CityResolverResponse_v20221101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20221101.CityResolverResponse {}
  interface AddressSearcherResponse_v20221101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20221101.AddressSearcherResponse {}
  interface NTACorporateInfoResolverResponse_v20221101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20221101.NTACorporateInfoResolverResponse {}
  interface NTACorporateInfoSearcherResponse_v20221101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20221101.NTACorporateInfoSearcherResponse {}

  export const validateAddressResolverResponse = (
    payload: unknown
  ): _v20221101.AddressResolverResponse =>
    validate<AddressResolverResponse_v20221101>(payload);

  export const validateCityResolverResponse = (
    payload: unknown
  ): _v20221101.CityResolverResponse =>
    validate<CityResolverResponse_v20221101>(payload);

  export const validateAddressSearcherResponse = (
    payload: unknown
  ): _v20221101.AddressSearcherResponse =>
    validate<AddressSearcherResponse_v20221101>(payload);

  export const validateNTACorporateInfoResolverResponse = (
    payload: unknown
  ): _v20221101.NTACorporateInfoResolverResponse =>
    validate<NTACorporateInfoResolverResponse_v20221101>(payload);

  export const validateNTACorporateInfoSearcherResponse = (
    payload: unknown
  ): _v20221101.NTACorporateInfoSearcherResponse =>
    validate<NTACorporateInfoSearcherResponse_v20221101>(payload);

  export const validateNTAQualifiedInvoiceIssuerInfoResolverResponse =
    _validateNTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace v20230901 {
  interface AddressResolverResponse_v20230901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20230901.AddressResolverResponse {}
  interface CityResolverResponse_v20230901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20230901.CityResolverResponse {}
  interface AddressSearcherResponse_v20230901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20230901.AddressSearcherResponse {}
  interface NTACorporateInfoResolverResponse_v20230901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20230901.NTACorporateInfoResolverResponse {}
  interface NTACorporateInfoSearcherResponse_v20230901 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20230901.NTACorporateInfoSearcherResponse {}

  export const validateAddressResolverResponse = (
    payload: unknown
  ): _v20230901.AddressResolverResponse =>
    validate<AddressResolverResponse_v20230901>(payload);

  export const validateCityResolverResponse = (
    payload: unknown
  ): _v20230901.CityResolverResponse =>
    validate<CityResolverResponse_v20230901>(payload);

  export const validateAddressSearcherResponse = (
    payload: unknown
  ): _v20230901.AddressSearcherResponse =>
    validate<AddressSearcherResponse_v20230901>(payload);

  export const validateNTACorporateInfoResolverResponse = (
    payload: unknown
  ): _v20230901.NTACorporateInfoResolverResponse =>
    validate<NTACorporateInfoResolverResponse_v20230901>(payload);

  export const validateNTACorporateInfoSearcherResponse = (
    payload: unknown
  ): _v20230901.NTACorporateInfoSearcherResponse =>
    validate<NTACorporateInfoSearcherResponse_v20230901>(payload);

  export const validateNTAQualifiedInvoiceIssuerInfoResolverResponse =
    _validateNTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace v20240101 {
  interface AddressResolverResponse_v20240101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20240101.AddressResolverResponse {}
  interface CityResolverResponse_v20240101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20240101.CityResolverResponse {}
  interface AddressSearcherResponse_v20240101 // eslint-disable-line @typescript-eslint/no-empty-interface
    extends _v20240101.AddressSearcherResponse {}

  export const validateAddressResolverResponse = (
    payload: unknown
  ): _v20240101.AddressResolverResponse =>
    validate<AddressResolverResponse_v20240101>(payload);

  export const validateCityResolverResponse = (
    payload: unknown
  ): _v20240101.CityResolverResponse =>
    validate<CityResolverResponse_v20240101>(payload);

  export const validateAddressSearcherResponse = (
    payload: unknown
  ): _v20240101.AddressSearcherResponse =>
    validate<AddressSearcherResponse_v20240101>(payload);

  export const validateNTACorporateInfoResolverResponse =
    _validateNTACorporateInfoResolverResponse_v20240101;

  export const validateNTACorporateInfoSearcherResponse =
    _validateNTACorporateInfoSearcherResponse_v20240101;

  export const validateNTAQualifiedInvoiceIssuerInfoResolverResponse =
    _validateNTAQualifiedInvoiceIssuerInfoResolverResponse_v20240101;
}

export const getValidators = <T extends APIVersion | undefined>(
  version: T
): Validators<T> => {
  if (version === '2022-09-01') {
    return v20220901 as Validators<T>;
  } else if (version === '2022-11-01') {
    return v20221101 as Validators<T>;
  } else if (version === '2023-09-01') {
    return v20230901 as Validators<T>;
  } else if (version === '2024-01-01') {
    return v20240101 as Validators<T>;
  } else {
    return compatible as Validators<T>;
  }
};
