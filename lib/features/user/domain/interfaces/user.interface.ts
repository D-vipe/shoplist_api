interface User {
  _id: string,
  name: string;
  surname: string;
  nickname: string;
  email: string | null;
  phone: string;
  password: string;
  isAdmin: boolean;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
