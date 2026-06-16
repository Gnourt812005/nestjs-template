export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundDomainException extends DomainException {}
export class ConflictDomainException extends DomainException {}
export class ForbiddenDomainException extends DomainException {}
export class BadRequestDomainException extends DomainException {}
export class UnauthorizedDomainException extends DomainException {}
