import * as z from "zod";

export const createUatSchema = z.object({
  countyId: z.coerce.number().int().gt(0),
  name: z.string(),
  siruta: z.number().int().gte(0),
  svgPath: z.string(),
  isResidence: z.boolean().optional(),
  slotsStatus: z.number().int().gte(0).lte(4).optional(),
  population: z.number().int().gte(0).max(2147483647).optional(),
  hallMail: z.string().optional(),
  petitionLink: z.string().optional(),
});

export const getUatsQuerySchema = z.object({
  countyId: z.coerce.number().int().gt(0).optional(),
});

export const getUatSchema = z.object({
  uatId: z.coerce.number().int().gt(0),
});

export const updateUatSchema = createUatSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });
