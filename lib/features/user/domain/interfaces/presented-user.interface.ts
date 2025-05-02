interface PresentedUser {
    id: string,
    name: string;
    surname: string;
    nickname: string;
    email: string | null;
    phone: string;
    isAdmin: boolean;
    teamId: string;
  }

  export default PresentedUser;
