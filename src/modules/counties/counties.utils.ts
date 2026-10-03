import type {
  CountiesGetAllResult,
  CountiesGetByIdResult,
} from "./counties.types.ts";

export const mapCounties = (counties: CountiesGetAllResult) => {
  return counties.map((c) => mapCounty(c));
};

export const mapCounty = (c: CountiesGetByIdResult) => ({
  id: c?.id,
  slug: c?.slug,
  code: c?.code,
  name: c?.name,
  svgPath: c?.svgPath,
  viewBox: c?.viewBox,
  codeX: c?.codeX,
  codeY: c?.codeY,
  uatsCount: c?._count.uats,
});
