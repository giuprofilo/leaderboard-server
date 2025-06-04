import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  // async signup(createUserDto: CreateUserDto): Promise<User> {
  //   const { email, password, nomeUsuario } = createUserDto;

  //   if (!email || !password) {
  //     throw new BadRequestException('Por favor, envie um email e uma senha.');
  //   }

  //   const existingEmail = await this.usersRepository.findOneBy({ email });
  //   if (existingEmail) {
  //     throw new BadRequestException('Este e-mail já está em uso');
  //   }

  //   const existingUserName = await this.usersRepository.findOneBy({
  //     nomeUsuario,
  //   });
  //   if (existingUserName) {
  //     throw new BadRequestException('Este nome de usuário já está em uso');
  //   }

  //   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  //   const user = this.usersRepository.create({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });

  //   return this.usersRepository.save(user);
  // }

  // async validateUserAndGenerateToken(email: string, password: string) {
  //   const user = await this.findByEmail(email);

  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new UnauthorizedException('Email ou senha estão incorretos');
  //   }

  //   const payload = { sub: user.id, email: user.email };
  //   const token = this.jwtService.sign(payload);

  //   return { access_token: token };
  // }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuário com o ID ${id} não encontrado para exclusão`,
      );
    }
  }
}
