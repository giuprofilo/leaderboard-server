import { IsString, Length, IsUUID } from 'class-validator';

export class CreateCodeVerifyDTO {
  @IsString()
  @Length(6, 6)
  code: string;

  @IsUUID()
  userId: string;
}