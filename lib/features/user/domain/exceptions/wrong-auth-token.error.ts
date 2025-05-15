export class WrongAuthTokenError extends Error {
    constructor() {
        super('general.wrongAuthError');
        this.name = 'WrongAuthTokenError';
    }
}
