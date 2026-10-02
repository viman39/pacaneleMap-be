import { Router } from "express";
import {
  createCounty,
  getAllCounties,
  getCounty,
  updateCounty,
  deleteCounty,
} from "./counties.controller.ts";

export const countiesRouter = Router();

countiesRouter.get("/", getAllCounties);
countiesRouter.get("/:countyId", getCounty);
countiesRouter.post("/", createCounty);
countiesRouter.patch("/:countyId", updateCounty);
countiesRouter.delete("/:countyId", deleteCounty);
