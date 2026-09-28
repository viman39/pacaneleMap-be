import { readFileSync } from "node:fs";
import { config } from "../config/env.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const ca = readFileSync(
  new URL("../../certs/rds-global-bundle.pem", import.meta.url),
  "utf8",
);

const adapter = new PrismaPg({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.username,
  password: config.db.password,
  ssl: {
    ca,
    rejectUnauthorized: true,
  },
  max: 5,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

export const prisma = new PrismaClient({ adapter });
