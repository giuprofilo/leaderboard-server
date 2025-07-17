import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendEmailDTO {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsArray()
  @IsEmail({}, { each: true })
  recipients: string[];

  @IsString()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;
}
