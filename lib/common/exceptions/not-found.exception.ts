import HttpException from "./http-exception";

class NotFoundException extends HttpException {
  constructor() {
    super(404, 'general.notFoundError');
  }
}

export default NotFoundException;
