import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user/user.entity';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ISeedMessage } from 'src/common/interfaces/ISeedMessage.interface';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nomeUsuario } = createUserDto;

    if (!email || !password) {
      throw new BadRequestException('Por favor, envie um email e uma senha.');
    }

    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Este e-mail já está em uso');
    }

    const existingUserName =
      await this.userRepository.findByUserName(nomeUsuario);
    if (existingUserName) {
      throw new BadRequestException('Este nome de usuário já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(id);
  }

  async seedDummyUsers(numberOfDummyUsers: number | null): Promise<ISeedMessage> {
    return this.seedDummyUsers(numberOfDummyUsers);
  }
}
