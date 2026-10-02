export class UatAlreadyExistsError extends Error {
  constructor() {
    super("An uat with this siruta already exists");
    this.name = "UatAlreadyExists";
  }
}

export class UatNotFoundError extends Error {
  constructor() {
    super("UAT not found");
    this.name = "UatNotFound";
  }
}

export const UAT_NOT_FOUND = {
  code: "UAT_NOT_FOUND",
  message: "UAT not found",
};
