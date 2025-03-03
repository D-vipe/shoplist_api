import { IsString } from 'class-validator';

class UserIdDto {
  @IsString({
    message: 'Неверный формат id'
  })
  public _id: string;
}

export default UserIdDto;
