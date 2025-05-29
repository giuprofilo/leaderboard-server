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
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O email informado não é válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/, {
    message:
      'A senha deve ter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial',
  })
  password: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @IsString()
  telefone: string;

  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  @IsString()
  nomeUsuario: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
