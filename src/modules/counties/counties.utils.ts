import type { CountyWithStats } from "./counties.types.ts";

export const mapCounty = (c: CountyWithStats) => ({
  id: c?.id,
  slug: c?.slug,
  code: c?.code,
  name: c?.name,
  svgPath: c?.svgPath,
  viewBox: c?.viewBox,
  codeX: c?.codeX,
  codeY: c?.codeY,
  uatsCount: c?._count.uats,
  slotsStatusSum: c?.slotsStatusSum,
  uatsOver15000Count: c?.uatsOver15000Count,
});
