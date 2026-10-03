import * as z from "zod";
import type {
  createCountySchema,
  updateCountySchema,
} from "./counties.validation.ts";
import type { getAllCounties, getCountyById } from "./counties.repository.ts";

export type County = {
  id: number;
  slug: string;
  code: string;
  name: string;
  svgPath: string;
  viewBox: string;
  codeX: number;
  codeY: number;
  deleted: boolean;
};

export type CreateCountyInput = z.infer<typeof createCountySchema>;
export type UpdateCountyInput = z.infer<typeof updateCountySchema> & {
  deleted?: boolean;
};

export type CountiesGetAllResult = Awaited<ReturnType<typeof getAllCounties>>;
export type CountiesGetByIdResult = Awaited<ReturnType<typeof getCountyById>>;
