import { IsString } from 'class-validator';

class GetItemsByListIdDto {
  @IsString()
  public list_id: string;
}

export default GetItemsByListIdDto;
