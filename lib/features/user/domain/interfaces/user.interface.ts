interface User {
  _id: string,
  name: string;
  surname: string;
  nickname: string;
  email: string | null;
  phone: string;
  password: string;
}

export default User;
