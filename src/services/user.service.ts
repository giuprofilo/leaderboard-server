import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user/user.entity';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ISeedMessage } from 'src/common/interfaces/ISeedMessage.interface';
import { CloudinaryService } from './cloudinary.service';
import { getRandomNumber } from 'src/database/seeders/utils/createDummyUsers.util';

const SALT_ROUNDS = 10;
const AVATAR_IMAGE =
  'https://res.cloudinary.com/leaderboard-cloud/image/upload/v1749571270/default-pfp_wv7y98.jpg';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createUserWithAvatar(
    createUserDto: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    let avatarUrl = AVATAR_IMAGE;

    if (file) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        avatarUrl = uploadResult.secure_url;
      } catch (error) {
        console.error('Erro no upload da imagem:', error);
        throw new BadRequestException('Falha ao enviar imagem de perfil');
      }
    }

    return this.createUser({
      ...createUserDto,
      points: createUserDto.points || getRandomNumber(),
      avatar: avatarUrl,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, username } = createUserDto;

    if (!email || !password) {
      throw new BadRequestException('Por favor, envie um email e uma senha.');
    }

    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Este e-mail já está em uso');
    }

    const existingUserName = await this.userRepository.findByUsername(username);
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

  async seedDummyUsers(
    numberOfDummyUsers: number | null,
  ): Promise<ISeedMessage> {
    return this.seedDummyUsers(numberOfDummyUsers);
  }
}
