import { IsString } from 'class-validator';

class GetListByIdDto {
  @IsString()
  public _id: string;
}

export default GetListByIdDto;
