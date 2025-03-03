import { z } from 'zod';
import {
  NTACorporateInfoCloseCause,
  NTACorporateInfoKind,
  NTACorporateInfoProcess,
} from './interfaces.v20220901';

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
  city: z.string(),
  city_kana: z.string(),
  town: z.string(),
  town_kana: z.string(),
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
  corporation: corporationSchema.nullable(),
});

export const citySchema = z.object({
  jisx0402: z.string(),
  prefecture_code: z.string(),
  prefecture: z.string(),
  prefecture_kana: z.string(),
  city_code: z.string(),
  city: z.string(),
  city_kana: z.string(),
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

export const addressSearcherResponseSchema =
  addressResolverResponseSchema.merge(
    z.object({
      query: addressSearcherQuerySchema,
      count: z.number(),
      offset: z.number(),
      limit: z.number(),
      facets: z.array(facetSchema).nullable(),
    })
  );

export const cityResolverResponseSchema = z.object({
  version: z.string(),
  data: z.array(citySchema),
});

export const ntaCorporateInfoSchema = z.object({
  published_date: z.string().optional(),
  sequence_number: z.string(),
  corporate_number: z.string(),
  process: z.nativeEnum(NTACorporateInfoProcess),
  correct: z.string(),
  update_date: z.string(),
  change_date: z.string(),
  name: z.string(),
  name_image_id: z.string().nullable(),
  kind: z.nativeEnum(NTACorporateInfoKind),
  prefecture_name: z.string().nullable(),
  city_name: z.string().nullable(),
  street_number: z.string(),
  town: z.string().nullable().optional(),
  kyoto_street: z.string().nullable().optional(),
  block_lot_num: z.string().nullable().optional(),
  building: z.string().nullable().optional(),
  floor_room: z.string().nullable().optional(),
  address_image_id: z.string().nullable(),
  jisx0402: z.string().nullable(),
  post_code: z.string().nullable(),
  address_outside: z.string(),
  address_outside_image_id: z.string().nullable(),
  close_date: z.string().nullable(),
  close_cause: z.nativeEnum(NTACorporateInfoCloseCause).nullable(),
  successor_corporate_number: z.string().nullable(),
  change_cause: z.string(),
  assignment_date: z.string(),
  en_name: z.string(),
  en_prefecture_name: z.string().nullable().optional(),
  en_address_line: z.string().nullable(),
  en_address_outside: z.string().nullable(),
  furigana: z.string(),
  hihyoji: z.string(),
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
