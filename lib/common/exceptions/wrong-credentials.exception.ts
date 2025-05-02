import HttpException from "./http-exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'Введены неверныe параметры');
  }
}

export default WrongCredentialsException;
