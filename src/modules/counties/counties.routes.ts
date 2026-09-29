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
countiesRouter.post("/", createCounty);
countiesRouter.get("/:countyId", getCounty);
countiesRouter.patch("/:countyId", updateCounty);
countiesRouter.delete("/:countyId", deleteCounty);
