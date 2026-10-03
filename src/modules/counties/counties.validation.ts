import * as z from "zod";

export const createCountySchema = z.object({
  slug: z.string(),
  code: z.string(),
  name: z.string(),
  svgPath: z.string(),
  viewBox: z.string(),
  codeX: z.number().gte(0).lte(900),
  codeY: z.number().gte(0).lte(665),
});

export const getCountySchema = z.object({
  countyId: z.coerce.number().int().gt(0),
});

export const updateCountySchema = createCountySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });
