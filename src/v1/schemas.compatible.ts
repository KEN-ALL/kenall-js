import { z } from 'zod';

import * as v20221101 from './interfaces.v20221101';
import * as v20221101S from './schemas.v20221101';

export const corporationSchema = v20221101S.corporationSchema;

export const addressSchema = z.object({
  jisx0402: z.string(),
  old_code: z.string(),
  postal_code: z.string(),
  prefecture: z.string(),
  prefecture_kana: z.string(),
  prefecture_roman: z.string().optional(),
  city: z.string(),
  city_kana: z.string(),
  city_roman: z.string().optional(),
  county: z.string().optional(),
  county_kana: z.string().optional(),
  county_roman: z.string().optional(),
  city_without_county_and_ward: z.string().optional(),
  city_without_county_and_ward_kana: z.string().optional(),
  city_without_county_and_ward_roman: z.string().optional(),
  city_ward: z.string().optional(),
  city_ward_kana: z.string().optional(),
  city_ward_roman: z.string().optional(),
  town: z.string(),
  town_kana: z.string(),
  town_roman: z.string().optional(),
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
  town_jukyohyoji: z.boolean().optional(),
  update_status: z.nativeEnum(v20221101.UpdateStatus).optional(),
  update_reason: z.nativeEnum(v20221101.UpdateReason).optional(),
  corporation: corporationSchema.nullable(),
});

export const addressResolverResponseSchema = z.object({
  version: z.string(),
  data: z.array(addressSchema),
});

export const facetSchema = v20221101S.facetSchema;

export const addressSearcherQuerySchema = v20221101S.addressSearcherQuerySchema;

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

export const citySchema = z.object({
  jisx0402: z.string(),
  prefecture_code: z.string(),
  prefecture: z.string(),
  prefecture_kana: z.string(),
  prefecture_roman: z.string().optional(),
  city_code: z.string(),
  city: z.string(),
  city_kana: z.string(),
  city_roman: z.string().optional(),
});

export const cityResolverResponseSchema = z.object({
  version: z.string(),
  data: z.array(citySchema),
});
