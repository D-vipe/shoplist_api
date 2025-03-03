import { IsString, IsInt, Min } from 'class-validator';

class CreateItemDto {
  @IsString({
    message: 'Неверный формат имени'
  })
  public name: string;

  @IsString({
    message: 'Неверный формат списка'
  })
  public list_id: string;

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
}

export default CreateItemDto;
