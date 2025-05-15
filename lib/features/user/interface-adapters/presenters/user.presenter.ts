import PresentedUser from '../../domain/interfaces/user/presented-user.interface';
import User from '../../domain/interfaces/user/user.interface';


const userPresenter = {
  presentUser: (user: User): PresentedUser => {
    // Map the Mongoose document to the User interface
    const presentedUser: PresentedUser = {
      id: user._id.toString(), // Convert Mongoose ObjectId to string
      name: user.name,
      surname: user.surname,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      teamId: user.teamId
    };

    return presentedUser;
  }
};

export default userPresenter;
