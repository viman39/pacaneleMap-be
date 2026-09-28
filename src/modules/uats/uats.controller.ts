import type { Response, Request } from "express";

export function getAllUats(_req: Request, res: Response): void {
  res.status(200).send({});
}

export function createUat(req: Request, res: Response): void {}
