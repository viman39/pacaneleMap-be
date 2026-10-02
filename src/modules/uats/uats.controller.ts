import type { Response, Request } from "express";
import {
  createUatSchema,
  getUatSchema,
  getUatsQuerySchema,
  updateUatSchema,
} from "./uats.validation.ts";
import { getValidationError } from "../../utils/error.utils.ts";
import * as service from "./uats.service.ts";
import { UatNotFoundError } from "./uats.errors.ts";

export async function getAllUats(req: Request, res: Response): Promise<void> {
  const queryParams = getUatsQuerySchema.safeParse(req.query);

  if (!queryParams?.success) {
    res.status(400).json({
      error: getValidationError(queryParams.error),
    });
    return;
  }

  const countyId = queryParams?.data?.countyId;

  res
    .status(200)
    .send(
      await (countyId
        ? service.getAllUatsByCountyId(countyId)
        : service.getAllUats()),
    );
}

export async function getUat(req: Request, res: Response): Promise<void> {
  const reqParams = getUatSchema.safeParse(req.params);

  if (!reqParams.success) {
    res.status(400).json({
      error: getValidationError(reqParams.error),
    });
    return;
  }

  const uat = await service.getUatById(reqParams.data.uatId);

  if (!uat) {
    throw new UatNotFoundError();
  }

  res.status(200).json(uat);
}

export async function createUat(req: Request, res: Response): Promise<void> {
  const bodyParams = createUatSchema.safeParse(req?.body);

  if (!bodyParams?.success) {
    res.status(400).json({
      error: getValidationError(bodyParams.error),
    });
    return;
  }

  const uat = await service.createUat(bodyParams.data);

  res.status(201).json({ uat });
}

export async function updateUat(req: Request, res: Response): Promise<void> {
  const bodyParams = updateUatSchema.safeParse(req.body);
  const reqParams = getUatSchema.safeParse(req.params);

  if (!bodyParams.success) {
    res.status(400).json({
      error: getValidationError(bodyParams.error),
    });
    return;
  }

  if (!reqParams.success) {
    res.status(400).json({
      error: getValidationError(reqParams.error),
    });
    return;
  }

  res
    .status(200)
    .json(await service.updateUat(reqParams.data.uatId, bodyParams.data));
}

export async function deleteUat(req: Request, res: Response): Promise<void> {
  const reqParams = getUatSchema.safeParse(req.params);

  if (!reqParams.success) {
    res.status(400).json({
      error: getValidationError(reqParams.error),
    });
    return;
  }

  res.status(200).json(await service.deleteUat(reqParams.data.uatId));
}
