export class UserNotFoundError extends Error {
    constructor() {
        super('user.notFound');
        this.name = 'UserNotFoundError';
    }
}
