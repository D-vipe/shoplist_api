import HttpException from "./http-exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, 'Введены неверныe параметры');
  }
}

export default WrongCredentialsException;
