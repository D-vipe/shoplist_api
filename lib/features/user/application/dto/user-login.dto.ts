import { IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';

// !TODO convert validation messages to i18n compatible
class UserLoginDto {
  @IsPhoneNumber('RU', {
    message: 'Неверный формат телефона'
  })
  @IsNotEmpty({
    message: 'Телефон обязателен'
  })
  public phone: string;

  @IsString({
      message: 'Неверный формат пароля'
  })
  @IsNotEmpty({
    message: 'Пароль обязателен'
  })
  public password: string;
}

export default UserLoginDto;
