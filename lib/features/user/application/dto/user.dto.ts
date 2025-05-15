import { IsOptional, IsString } from 'class-validator';

// !TODO convert validation messages to i18n compatible
class UserDto {
  @IsOptional()
  public name?: string | null;
  @IsOptional()
  public surname?: string | null;

  @IsString({
    message: 'Nick должен быть строкой'
  })
  public nickname: string;

  @IsOptional()
  public email?: string | null;

  @IsString({
    message: 'Телефон должен быть строкой'
  })
  public phone: string;

  @IsString({
    message: 'Пароль должен быть строкой'
  })
  public password: string;
}

export default UserDto;
