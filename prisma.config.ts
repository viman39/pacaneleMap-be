/// <reference types="node" />

import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

loadEnv({
  path: fileURLToPath(new URL("./.env.migration", import.meta.url)),
});

const certificatePath = fileURLToPath(
  new URL("./certs/rds-eu-central-1-rsa2048-g1.pem", import.meta.url),
);

function withTls(connectionString: string): string {
  const url = new URL(connectionString);

  url.searchParams.set("sslcert", certificatePath);
  url.searchParams.set("sslmode", "require");
  url.searchParams.set("sslaccept", "strict");

  return url.toString();
}

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: withTls(env("DATABASE_URL")),
    shadowDatabaseUrl: withTls(env("SHADOW_DATABASE_URL")),
  },
});
