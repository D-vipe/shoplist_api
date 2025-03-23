import HttpException from "./http-exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, 'Не удалось найти токен авторизации. Авторизуйтесь повторно');
  }
}

export default WrongCredentialsException;
