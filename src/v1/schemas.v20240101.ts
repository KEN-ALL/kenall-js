import { z } from 'zod';

import {
  NTACorporateInfoCloseCause,
  NTACorporateInfoKind,
  NTACorporateInfoProcess,
  NTAQualifiedInvoiceIssuerCorrect,
  NTAQualifiedInvoiceIssuerCountry,
  NTAQualifiedInvoiceIssuerKind,
  NTAQualifiedInvoiceIssuerProcess,
  NTAQualifiedInvoiceIssuerUpdateStatus,
  UpdateReason,
  UpdateStatus,
} from './interfaces.v20240101';

export const corporationSchema = z.object({
  name: z.string(),
  name_kana: z.string(),
  block_lot: z.string(),
  block_lot_num: z.string().nullable(),
  post_office: z.string(),
  code_type: z.number(),
});

export const addressSchema = z.object({
  jisx0402: z.string(),
  old_code: z.string(),
  postal_code: z.string(),
  prefecture: z.string(),
  prefecture_kana: z.string(),
  prefecture_roman: z.string(),
  city: z.string(),
  city_kana: z.string(),
  city_roman: z.string(),
  county: z.string(),
  county_kana: z.string(),
  county_roman: z.string(),
  city_without_county_and_ward: z.string(),
  city_without_county_and_ward_kana: z.string(),
  city_without_county_and_ward_roman: z.string(),
  city_ward: z.string(),
  city_ward_kana: z.string(),
  city_ward_roman: z.string(),
  town: z.string(),
  town_kana: z.string(),
  town_roman: z.string(),
  town_raw: z.string(),
  town_kana_raw: z.string(),
  koaza: z.string(),
  kyoto_street: z.string().nullable(),
  building: z.string(),
  floor: z.string(),
  town_partial: z.boolean(),
  town_addressed_koaza: z.boolean(),
  town_multi: z.boolean(),
  town_chome: z.boolean(),
  town_jukyohyoji: z.boolean(),
  update_status: z.nativeEnum(UpdateStatus),
  update_reason: z.nativeEnum(UpdateReason),
  corporation: corporationSchema.nullable(),
});

export const addressResolverResponseSchema = z.object({
  version: z.string(),
  data: z.array(addressSchema),
});

export const facetSchema = z.tuple([z.string(), z.number()]);

export const addressSearcherQuerySchema = z.object({
  q: z.string().nullable(),
  t: z.string().nullable(),
  prefecture: z.string().nullable(),
  county: z.string().nullable(),
  city: z.string().nullable(),
  city_ward: z.string().nullable(),
  town: z.string().nullable(),
  kyoto_street: z.string().nullable(),
  block_lot_num: z.string().nullable(),
  building: z.string().nullable(),
  floor_room: z.string().nullable(),
});

/**
 * An `AddressSearcherResponse` describes a response to
 * "searchAddresses" API call.
 */
export const addressSearcherResponseSchema =
  addressResolverResponseSchema.extend({
    query: addressSearcherQuerySchema,
    count: z.number(),
    offset: z.number(),
    limit: z.number(),
    facets: z.array(facetSchema).nullable(),
  });

export const citySchema = z.object({
  jisx0402: z.string(),
  prefecture_code: z.string(),
  prefecture: z.string(),
  prefecture_kana: z.string(),
  prefecture_roman: z.string(),
  city_code: z.string(),
  city: z.string(),
  city_kana: z.string(),
  city_roman: z.string(),
  county: z.string(),
  county_kana: z.string(),
  county_roman: z.string(),
  city_without_county_and_ward: z.string(),
  city_without_county_and_ward_kana: z.string(),
  city_without_county_and_ward_roman: z.string(),
});

export const cityResolverResponseSchema = z.object({
  version: z.string(),
  data: z.array(citySchema),
});

export const bankSchema = z.object({
  code: z.string(),
  name: z.string(),
  katakana: z.string(),
  hiragana: z.string(),
  romaji: z.string(),
});

export const bankBranchSchema = z.object({
  code: z.string(),
  name: z.string(),
  katakana: z.string(),
  hiragana: z.string(),
  romaji: z.string(),
});

export const banksResponseSchema = z.object({
  version: z.string(),
  data: z.array(bankSchema),
});

export const bankResolverResponseSchema = z.object({
  version: z.string(),
  data: bankSchema,
});

export const bankBranchesResponseSchema = z.object({
  version: z.string(),
  data: z.object({
    bank: bankSchema,
    branches: z.record(bankBranchSchema),
  }),
});

export const bankBranchResolverResponseSchema = z.object({
  version: z.string(),
  data: z.object({
    bank: bankSchema,
    branch: bankBranchSchema,
  }),
});

export const ntaEntityAddressSchema = z.object({
  postal_code: z.string().nullable(),
  jisx0402: z.string().nullable(),
  prefecture: z.string().nullable(),
  prefecture_kana: z.string().nullable(),
  prefecture_roman: z.string().nullable(),
  city: z.string().nullable(),
  city_kana: z.string().nullable(),
  city_roman: z.string().nullable(),
  street_number: z.string(),
  town: z.string().nullable(),
  kyoto_street: z.string().nullable(),
  block_lot_num: z.string().nullable(),
  building: z.string().nullable(),
  floor_room: z.string().nullable(),
});

export const ntaCorporateInfoSchema = z.object({
  published_date: z.string().optional(),
  sequence_number: z.number(),
  corporate_number: z.string(),
  process: z.nativeEnum(NTACorporateInfoProcess),
  correct: z.number(),
  update_date: z.string(),
  change_date: z.string(),
  name: z.string(),
  name_image_id: z.string().nullable(),
  kind: z.nativeEnum(NTACorporateInfoKind),
  address: ntaEntityAddressSchema,
  address_image_id: z.string().nullable(),
  address_outside: z.string(),
  address_outside_image_id: z.string().nullable(),
  close_date: z.string().nullable(),
  close_cause: z.nativeEnum(NTACorporateInfoCloseCause).nullable(),
  successor_corporate_number: z.string().nullable(),
  change_cause: z.string(),
  assignment_date: z.string(),
  en_name: z.string(),
  en_address_line: z.string().nullable(),
  en_address_outside: z.string().nullable(),
  furigana: z.string(),
  hihyoji: z.number(),
  qualified_invoice_issuer_number: z.string().nullable(),
});

export const ntaCorporateInfoResolverResponseSchema = z.object({
  version: z.string(),
  data: ntaCorporateInfoSchema,
});

export const ntaCorporateInfoFacetsSchema = z.object({
  area: facetSchema.optional(),
  kind: facetSchema.optional(),
  process: facetSchema.optional(),
  close_cause: facetSchema.optional(),
});

export const ntaCorporateInfoSearcherResponseSchema = z.object({
  version: z.string(),
  data: z.array(ntaCorporateInfoSchema),
  query: z.string(),
  count: z.number(),
  offset: z.number(),
  limit: z.number(),
  facets: ntaCorporateInfoFacetsSchema.nullable(),
});

export const ntaQualifiedInvoiceIssuerInfoSchema = z.object({
  published_date: z.string(),
  sequence_number: z.number(),
  qualified_invoice_issuer_number: z.string(),
  process: z.nativeEnum(NTAQualifiedInvoiceIssuerProcess),
  correct: z.nativeEnum(NTAQualifiedInvoiceIssuerCorrect).nullable(),
  kind: z.nativeEnum(NTAQualifiedInvoiceIssuerKind),
  country: z.nativeEnum(NTAQualifiedInvoiceIssuerCountry),
  latest: z.nativeEnum(NTAQualifiedInvoiceIssuerUpdateStatus),
  registration_date: z.string().nullable(),
  update_date: z.string().nullable(),
  disposal_date: z.string().nullable(),
  expire_date: z.string().nullable(),
  address: ntaEntityAddressSchema,
  address_request: ntaEntityAddressSchema,
  address_inside: ntaEntityAddressSchema,
  kana: z.string().nullable(),
  name: z.string().nullable(),
  trade_name: z.string().nullable(),
  popular_name_previous_name: z.string().nullable(),
});

export const ntaQualifiedInvoiceIssuerInfoResolverResponseSchema = z.object({
  version: z.string(),
  data: ntaQualifiedInvoiceIssuerInfoSchema,
});
