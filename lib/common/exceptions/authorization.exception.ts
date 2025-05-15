import HttpException from './http-exception';

class AuthorizationException extends HttpException {
  constructor(message?: string) {
    super(401, (message != null && message.length > 0) ? message : 'token.authTokenError');
  }
}

export default AuthorizationException;
