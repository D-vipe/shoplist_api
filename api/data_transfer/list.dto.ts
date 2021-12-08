import { IsString } from 'class-validator';

class ListDto {
  @IsString()
  public name: string;

  @IsString()
  public user_id: string;

}

export default ListDto;
