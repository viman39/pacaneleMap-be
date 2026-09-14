import express, { type Express, type Request, type Response } from "express";

export const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("Server up");
});
