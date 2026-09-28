import type { Request, Response } from "express";
import * as countiesService from "./counties.service.ts";
import { createCountySchema, getCountySchema } from "./counties.validation.ts";
import { getValidationError, COUNTY_NOT_FOUND } from "./counties.errors.ts";

export async function getAllCounties(
  _req: Request,
  res: Response,
): Promise<void> {
  res.status(200).send(await countiesService.getAllCounties());
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

  res.status(200).json({ county });
}

export function updateCounty(req: Request, res: Response): void {}

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
