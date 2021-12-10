import { IsString, IsArray, IsBoolean } from 'class-validator';

class UpdateListDto {
  @IsString({
    message: 'Неверный формат'
  })
  public _id: string;

  @IsString({
    message: 'Неверный формат имени'
  })
  public name: string;

  @IsArray({
    message: 'Неверный формат связанных пользователей'
  })
  public assigned_id: Array<string>;

  @IsArray({
    message: 'Неверный формат элементов списка'
  })
  public items: Array<string>;

  @IsBoolean({
    message: "Неверный формат поля"
  })
  public finished: boolean;

}

export default UpdateListDto;
