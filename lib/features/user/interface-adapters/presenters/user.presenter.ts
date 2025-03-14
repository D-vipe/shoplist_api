import User from "../../domain/interfaces/user.interface";


const userPresenter = {
    presentUser: (user: User): User => {
      // Create a copy of the user object to avoid mutating the original
      const presentedUser = { ...user };
      // Remove sensitive information
      delete presentedUser.password;
      return presentedUser;
    }
  };

  export default userPresenter;
