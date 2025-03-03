import { IsString, IsInt, Min } from 'class-validator';

class ItemDto {
  @IsString()
  public name: string;

  @Min(0)
  @IsInt()
  public amount: number;

  @Min(0)
  @IsString()
  public price: number;

  @IsString()
  public list_id: string;
}

export default ItemDto;
