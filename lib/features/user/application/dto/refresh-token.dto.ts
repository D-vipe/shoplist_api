import { IsString, IsNotEmpty } from 'class-validator';

// !TODO convert validation messages to i18n compatible
class RefreshTokenDto {
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token should not be empty' })
  token: string;
}

export default RefreshTokenDto;
