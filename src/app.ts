import express, { type Express, type Request, type Response } from "express";
import { healthRouter } from "./modules/health/health.routes.ts";
import { notFoundHandler } from "./middleware/not-found.middleware.ts";
import { countiesRouter } from "./modules/counties/counties.routes.ts";
import { uatsRouter } from "./modules/uats/uats.routes.ts";
import { errorHandler } from "./middleware/error-handler.middleware.ts";

export const app: Express = express();

app.use(express.json());

app.use("/counties", countiesRouter);
app.use("/uats", uatsRouter);
app.use("/health", healthRouter);

app.use(notFoundHandler);
app.use(errorHandler);
