export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

export class UnauthorisedAccessError extends Error {
  constructor() {
    super("Unauthorised Access");
    this.name = "UnauthorisedAccess";
  }
}

export class R2StorageLimitExceededError extends Error {
  constructor() {
    super("R2StorageLimitExceeded");
    this.name = "Storage limit exceeded";
  }
}
