import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'Использован неверный токен авторизации');
  }
}

export default WrongCredentialsException;
