import * as z from "zod";
import type { createUatSchema, updateUatSchema } from "./uats.validation.ts";

export type CreateUatInput = z.infer<typeof createUatSchema>;
export type UpdateUatInput = z.infer<typeof updateUatSchema> & {
  deleted?: boolean;
};
