import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/authentication-token-missing.exception';
import userModel from 'lib/features/user/infrastructure/models/user.model';
import RequestWithUser from '../interfaces/request-with-user.interface';
import ExpiredTokenException from '../exceptions/expired-token.exception';
import WrongCredentialsException from '../exceptions/wrong-credentials.exception';
import HttpException from '../exceptions/http-exception';
import DataStoredInToken from 'lib/features/user/domain/interfaces/tokenId.interface';
// Adjust the path to your User model

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    let errorMessage: string = '';
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // logger.error('AuthMiddleware error: Missing token');
            return AuthenticationTokenMissingException;
        }

        const token = authHeader.split(' ')[1];

        // Verify the token
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            errorMessage = 'JWT_SECRET is not defined in environment variables';

            // logger.error(errorMessage);
            throw new HttpException(500, errorMessage);
        }

        const decodedToken = jwt.verify(token, secretKey) as DataStoredInToken;

        // Check if the token has expired
        // if (decodedToken.exp * 1000 < Date.now()) {
        //     const exception: ExpiredTokenException = new ExpiredTokenException();

        //     logger.error(exception.message);

        //     throw exception;
        // }

        // Check if the user ID exists in the database
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            throw new WrongCredentialsException();
        }

        // Attach the user to the request object for further use
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    // try {

    // } catch (error) {
    //     // console.error('Error in gameAuthMiddleware:', error);

    //     if (error instanceof HttpException) {
    //         res.status(error.status).json({ message: error.message });
    //     } else {
    //         res.status(400).json({ message: 'Authentication failed', error: error.message });
    //     }
    // }
};

export default authMiddleware;
