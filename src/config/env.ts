function requireEnv(
  name: string,
  isNumber?: false,
  checks?: { (x: any): void }[],
): string;

function requireEnv(
  name: string,
  isNumber: true,
  checks?: { (x: any): void }[],
): number;

function requireEnv(
  name: string,
  isNumber?: boolean,
  checks?: { (x: any): void }[],
): string | number {
  const env = isNumber
    ? process.env[name] && Number(process.env[name])
    : process.env[name];

  if (!env || (!isNumber && env.toString().trim() === "")) {
    throw new Error(`Missing env variable: ${name}`);
  }

  if (checks?.length) {
    checks.forEach((check) => check(env));
  }

  return env;
}

const checkDbConfig = () => ({
  host: requireEnv("DB_HOST"),
  port: requireEnv("DB_PORT", true, [
    (x: number) => {
      if (!Number.isInteger(x) || x < 1 || x > 65535) {
        throw new Error("DB_PORT must be a number between 1 and 65535");
      }
    },
  ]),
  database: requireEnv("DB_NAME"),
  username: requireEnv("DB_USERNAME"),
  password: requireEnv("DB_PASSWORD"),
});

const checkCognitoConfig = () => ({
  region: requireEnv("COGNITO_REGION"),
  userPool: requireEnv("COGNITO_USER_POOL_ID"),
  client: requireEnv("COGNITO_CLIENT_ID"),
  clientSecret: requireEnv("COGNITO_CLIENT_SECRET"),
});

export const config = { db: checkDbConfig(), cognito: checkCognitoConfig() };
