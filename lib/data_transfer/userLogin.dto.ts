import { IsString, IsEmail } from 'class-validator';

class UserLoginDto {
  @IsEmail({
    message: 'Неверный формат id'
  })
  public email: string;

  @IsString({
      message: 'Неверный формат пароля'
  })
  public password: string;
}

export default UserLoginDto;
