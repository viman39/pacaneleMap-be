import type { Request, Response } from "express";
import * as countiesService from "./counties.service.ts";
import {
  createCountySchema,
  getCountySchema,
  updateCountySchema,
} from "./counties.validation.ts";
import { COUNTY_NOT_FOUND } from "./counties.errors.ts";
import { getValidationError } from "../../utils/error.utils.ts";
import { mapCounties, mapCounty } from "./counties.utils.ts";

export async function getAllCounties(
  _req: Request,
  res: Response,
): Promise<void> {
  const counties = await countiesService.getAllCounties();

  res.status(200).send(mapCounties(counties));
  return;
}

export async function getCounty(req: Request, res: Response): Promise<void> {
  const reqParams = getCountySchema.safeParse(req.params);

  if (!reqParams.success) {
    res.status(400).json({
      error: getValidationError(reqParams.error),
    });
    return;
  }

  const county = await countiesService.getCounty(reqParams?.data?.countyId);

  if (!county) {
    res.status(404).json({
      error: COUNTY_NOT_FOUND,
    });
    return;
  }

  res.status(200).json({ county: mapCounty(county) });
}

export async function updateCounty(req: Request, res: Response): Promise<void> {
  const reqParams = getCountySchema.safeParse(req.params);
  const reqBody = updateCountySchema.safeParse(req.body);

  if (!reqParams.success) {
    res.status(400).json({
      error: getValidationError(reqParams?.error),
    });
    return;
  }

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody?.error),
    });
    return;
  }

  res
    .status(200)
    .json(
      await countiesService.updateCounty(
        reqParams?.data?.countyId,
        reqBody.data,
      ),
    );
}

export async function createCounty(req: Request, res: Response): Promise<void> {
  const reqBody = createCountySchema.safeParse(req.body);

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody.error),
    });
    return;
  }

  const county = await countiesService.createCounty(reqBody.data);

  res.status(201).json({ county });
}

export async function deleteCounty(req: Request, res: Response): Promise<void> {
  const reqParams = getCountySchema.safeParse(req.params);

  if (!reqParams.success) {
    res.status(400).json({
      error: getValidationError(reqParams.error),
    });
    return;
  }

  res
    .status(200)
    .json(await countiesService.deleteCounty(reqParams?.data?.countyId));
}
