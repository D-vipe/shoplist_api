export class NotFoundTokenError extends Error {
    constructor() {
        super('token.notFoundError');
        this.name = 'NotFoundTokenError';
    }
}
