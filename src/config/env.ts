const checkDbConfig = () => {
  const host = process?.env?.DB_HOST;
  const port = process?.env?.DB_PORT && Number(process?.env?.DB_PORT);
  const database = process?.env?.DB_NAME;
  const username = process?.env?.DB_USERNAME;
  const password = process?.env?.DB_PASSWORD;

  if (!host || host.trim() === "") {
    throw new Error("Missing env variable: DB_HOST");
  }

  if (!port) {
    throw new Error("Missing env variable: DB_PORT");
  } else if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("DB_PORT must be a number between 1 and 65535");
  }

  if (!database || database.trim() === "") {
    throw new Error("Missing env variable: DB_NAME");
  }

  if (!username || username.trim() === "") {
    throw new Error("Missing env variable: DB_USERNAME");
  }

  if (!password || password.trim() === "") {
    throw new Error("Missing env variable: DB_PASSWORD");
  }

  return {
    db: {
      host,
      port,
      database,
      username,
      password,
    },
  };
};

export const config = checkDbConfig();
