import { IsString } from 'class-validator';

class GetItemsByIdDto {
  @IsString()
  public _id: string;
}

export default GetItemsByIdDto;
