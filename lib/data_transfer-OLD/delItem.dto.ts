import { IsString } from 'class-validator';

class DelItemDto {
  @IsString({
    message: 'Неверный формат id элемента'
  })
  public _id: string;

  @IsString({
    message: 'Неверный формат номера списка'
  })
  public list_id: string;
}

export default DelItemDto;
