import HttpException from "./http-exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'general.wrongCredentialsError');
  }
}

export default WrongCredentialsException;
