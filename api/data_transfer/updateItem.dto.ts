import { IsString, IsInt, Min, IsBoolean } from 'class-validator';

class UpdateItemDto {
  @IsString({
    message: 'Неверный формат id'
  })
  public _id: string;

  @IsString({
    message: 'Неверный формат имени'
  })
  public name: string;

  @IsInt({
    message: 'Неверный формат количества'
  })
  @Min(1, {
    message: 'Минимум 1'
  })
  public amount: number;

  @IsInt({
    message: 'Неверный формат суммы'
  })
  public price: number;

  @IsBoolean({
    message: 'Неверный формат поля'
  })
  public checked: boolean;
}

export default UpdateItemDto;
