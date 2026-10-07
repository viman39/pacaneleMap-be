import { Router } from "express";
import {
  createCounty,
  getAllCounties,
  getCounty,
  updateCounty,
  deleteCounty,
} from "./counties.controller.ts";
import { requireAuth } from "../../middleware/require-auth.middleware.ts";
import { requirePermission } from "../../middleware/require-permission.middleware.ts";

export const countiesRouter = Router();

countiesRouter.get("/", getAllCounties);
countiesRouter.get("/:countyId", getCounty);
countiesRouter.post("/", requireAuth, requirePermission(), createCounty);
countiesRouter.patch(
  "/:countyId",
  requireAuth,
  requirePermission(),
  updateCounty,
);
countiesRouter.delete(
  "/:countyId",
  requireAuth,
  requirePermission(),
  deleteCounty,
);
