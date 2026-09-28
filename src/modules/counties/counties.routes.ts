import { Router } from "express";
import {
  createCounty,
  getAllCounties,
  getCounty,
  updateCounty,
} from "./counties.controller.ts";

export const countiesRouter = Router();

countiesRouter.get("/", getAllCounties);
countiesRouter.post("/", createCounty);
countiesRouter.get("/:countyId", getCounty);
countiesRouter.patch("/:countyId", updateCounty);
