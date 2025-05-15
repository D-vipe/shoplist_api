import HttpException from "./http-exception";


class ExpiredTokenException extends HttpException {
  constructor() {
    super(401, 'token.expiredError');
  }
}

export default ExpiredTokenException;
