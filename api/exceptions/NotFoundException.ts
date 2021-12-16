import HttpException from "./HttpException";

class NotFoundException extends HttpException {
  constructor(msg: string) {
    super(404, msg ?? 'Не удалось найти то, что вы искали');
  }
}

export default NotFoundException;
