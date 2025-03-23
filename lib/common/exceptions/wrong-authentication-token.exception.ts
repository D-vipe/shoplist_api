import HttpException from "./http-exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, 'Использован неверный токен авторизации');
  }
}

export default WrongCredentialsException;
