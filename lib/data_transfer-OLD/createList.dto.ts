import { IsString } from 'class-validator';

class CreateListDto {
  @IsString()
  public name: string;

  @IsString()
  public user_id: string;

}

export default CreateListDto;
