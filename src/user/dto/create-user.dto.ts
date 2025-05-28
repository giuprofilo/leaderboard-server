import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'O email informado não é válido' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/, {
    message:
      'A senha deve ter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial',
  })
  password: string;
  @IsString()
  telefone: string;

  @IsString()
  nomeUsuario: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
