class TokenData {
  token: string;
  refresh: string;

  constructor(token: string, refresh: string) {
    this.token = token;
    this.refresh = refresh;
  }
}

export default TokenData;
