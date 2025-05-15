export class LoginWrongCredentialsError extends Error {
    constructor() {
        super('general.wrongCredentialsError');
        this.name = 'LoginWrongCredentialsError';
    }
}
