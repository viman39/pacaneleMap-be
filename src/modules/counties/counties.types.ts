import * as z from "zod";
import type { createCountySchema } from "./counties.validation.ts";

export type County = {
  id: number;
  slug: string;
  code: string;
  name: string;
  svgPath: string;
  viewBox: string;
  labelX: number;
  labelY: number;
};

export type CreateCountyInput = z.infer<typeof createCountySchema>;
