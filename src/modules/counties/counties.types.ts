import * as z from "zod";
import type {
  createCountySchema,
  updateCountySchema,
} from "./counties.validation.ts";

export type County = {
  id: number;
  slug: string;
  code: string;
  name: string;
  svgPath: string;
  viewBox: string;
  labelX: number;
  labelY: number;
  deleted: boolean;
};

export type CreateCountyInput = z.infer<typeof createCountySchema>;
export type UpdateCountyInput = z.infer<typeof updateCountySchema> & {
  deleted?: boolean;
};
