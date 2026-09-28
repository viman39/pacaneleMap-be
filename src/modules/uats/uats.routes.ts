import { Router } from "express";
import { createUat, getAllUats } from "./uats.controller.ts";

export const uatsRouter = Router();

uatsRouter.get("/", getAllUats);
uatsRouter.post("/", createUat);
