export class TokenServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TokenServiceError';
    }

}
