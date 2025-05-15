interface PresentedUser {
    id: string,
    name: string;
    surname: string;
    nickname: string;
    email?: string;
    phone?: string;
    isAdmin: boolean;
    teamId: string;
  }

  export default PresentedUser;
