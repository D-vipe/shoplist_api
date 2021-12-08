import { IsString, IsInt, Min } from 'class-validator';

class UserDto {
  @IsString({
    message: 'Имя должно быть строкой'
  })
  public name: string;

  @IsString({
    message: 'Фамилия должна быть строкой'
  })
  public surname: string;

  @IsString({
    message: 'Почта должна быть строкой'
  })
  public email: string;

  @IsString({
    message: 'Телефон должен быть строкой'
  })
  public phone: string;

  @IsString({
    message: 'Пароль должен быть строкой'
  })
  public password: string;

  @Min(0, {
    message: 'Возраст не может быть меньше 0'
  })
  @IsInt({
    message: 'Возраст должен быть числом'
  })
  public age: number;
}

export default UserDto;
