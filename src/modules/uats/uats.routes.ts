import { Router } from "express";
import {
  createUat,
  getAllUats,
  updateUat,
  deleteUat,
  getUat,
} from "./uats.controller.ts";

export const uatsRouter = Router();

uatsRouter.get("/", getAllUats);
uatsRouter.get("/:uatId", getUat);
uatsRouter.post("/", createUat);
uatsRouter.patch("/:uatId", updateUat);
uatsRouter.delete("/:uatId", deleteUat);
