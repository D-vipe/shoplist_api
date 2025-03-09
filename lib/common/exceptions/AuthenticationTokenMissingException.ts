import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(404, 'Не удалось найти токен авторизации. Авторизуйтесь повторно');
  }
}

export default WrongCredentialsException;
