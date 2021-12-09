import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, 'Введены неверныe параметры');
  }
}

export default WrongCredentialsException;
