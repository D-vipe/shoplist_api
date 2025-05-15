
import jwt from 'jsonwebtoken';
import userPresenter from "../../interface-adapters/presenters/user.presenter";
import DataStoredInToken from "../../domain/interfaces/token/tokenId.interface";
import User from '../../domain/interfaces/user/user.interface';
import TokenData from '../../domain/interfaces/token/token.interface';
import PresentedUser from '../../domain/interfaces/user/presented-user.interface';


const createTokenUseCase = {
    execute: (user: User): TokenData => {
        const expiresIn = 60 * 60 * 12; // 12 hours
        const refreshExpiresIn = 60 * 60 * 24 * 7; // 7 days
        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        const presentedUser: PresentedUser = userPresenter.presentUser(user);

        const dataStoredInToken: PresentedUser = {
          ...presentedUser
        };

        const dataStoredInRefresh: DataStoredInToken = {
          id: presentedUser.id
        };

        const accessToken = jwt.sign(dataStoredInToken, secret, { expiresIn: expiresIn },);
        const refreshToken = jwt.sign(dataStoredInRefresh, refreshSecret, { expiresIn: refreshExpiresIn });

        return new TokenData(accessToken, refreshToken);
    }
  };

  export default createTokenUseCase;
