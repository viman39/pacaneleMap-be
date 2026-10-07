import { Router } from "express";
import {
  createUat,
  getAllUats,
  updateUat,
  deleteUat,
  getUat,
} from "./uats.controller.ts";
import { requireAuth } from "../../middleware/require-auth.middleware.ts";
import { requirePermission } from "../../middleware/require-permission.middleware.ts";

export const uatsRouter = Router();

uatsRouter.get("/", getAllUats);
uatsRouter.get("/:uatId", getUat);
uatsRouter.post("/", requireAuth, requirePermission(), createUat);
uatsRouter.patch("/:uatId", requireAuth, requirePermission(), updateUat);
uatsRouter.delete("/:uatId", requireAuth, requirePermission(), deleteUat);
