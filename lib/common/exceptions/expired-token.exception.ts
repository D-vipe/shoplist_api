import HttpException from "./http-exception";


class ExpiredTokenException extends HttpException {
  constructor() {
    super(401, 'Время действия токена истекло');
  }
}

export default ExpiredTokenException;
