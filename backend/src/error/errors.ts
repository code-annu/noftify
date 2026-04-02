import AppError from "./AppError";
import ErrorType from "./ErrorType";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, ErrorType.NOT_FOUND);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403, ErrorType.FORBIDDEN);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, ErrorType.BAD_REQUEST);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500, ErrorType.INTERNAL_SERVER_ERROR, false);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422, ErrorType.UNPROCESSABLE_ENTITY);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, ErrorType.CONFLICT);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, 429, ErrorType.TOO_MANY_REQUESTS);
  }
}

export class MissingTokenError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.MISSING_TOKEN);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.INVALID_TOKEN);
  }
}

export class MissingApiKeyError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.MISSING_API_KEY);
  }
}

export class InvalidApiKeyError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.INVALID_API_KEY);
  }
}

export class AppLimitExceedError extends AppError {
  constructor(message: string) {
    super(message, 403, ErrorType.APP_LIMIT_EXCEED);
  }
}

export class AppUserLimitExceedError extends AppError {
  constructor(message: string) {
    super(message, 403, ErrorType.APP_USER_LIMIT_EXCEED);
  }
}
