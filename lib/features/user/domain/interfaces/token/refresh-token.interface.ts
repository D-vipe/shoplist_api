interface RefreshToken {
    _id: string,
    token: string,
    userId: string,
    clientId?: string,
    expiryDate: Date,
    revoked: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export default RefreshToken;
