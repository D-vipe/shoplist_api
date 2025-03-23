import HttpException from "./http-exception";

class NotFoundException extends HttpException {
  constructor() {
    super(404, 'Не удалось найти то, что вы искали');
  }
}

export default NotFoundException;
