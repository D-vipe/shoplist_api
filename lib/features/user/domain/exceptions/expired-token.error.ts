export class ExpiredTokenError extends Error {
    constructor() {
      super('token.expiredError');
      this.name = 'ExpiredTokenError';
    }
  }
