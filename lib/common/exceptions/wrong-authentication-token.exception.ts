import HttpException from "./http-exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, 'general.wrongAuthError');
  }
}

export default WrongCredentialsException;
