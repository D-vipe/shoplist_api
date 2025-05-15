export class DuplicateUserPhoneError extends Error {
    constructor() {
        super('user.duplicatePhoneError');
        this.name = 'DuplicateUserError';
    }
}

export class DuplicateUserEmailError extends Error {
    constructor() {
        super('user.duplicateEmailError');
        this.name = 'DuplicateUserEmailError';
    }
}
