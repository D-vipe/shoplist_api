import HttpException from './http-exception';

class WrongCredentialsException extends HttpException {
  constructor(message?: string) {
    super(400, (message != null && message.length > 0) ? message : 'general.wrongCredentialsError');
  }
}

export default WrongCredentialsException;
