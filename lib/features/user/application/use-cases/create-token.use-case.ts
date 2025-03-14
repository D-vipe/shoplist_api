import TokenData from "../../domain/interfaces/token.interface";
import DataStoredInToken from "../../domain/interfaces/tokenId.interface";
import User from "../../domain/interfaces/user.interface";

const createTokenUseCase = {
    execute: (user: User): TokenData => {
        const expiresIn = 60 * 60 * 12; // 12 hours
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
        };
        return new TokenData();
    }
  };

  export default createTokenUseCase;
