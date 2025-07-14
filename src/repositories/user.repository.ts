import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { USER_REPOSITORY } from 'src/database/providers/constants';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return (
      (await this.userRepository.findOne({ where: { email } })) ?? undefined
    );
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return (
      (await this.userRepository.findOne({ where: { username } })) ?? undefined
    );
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: {
        points: 'DESC',
        username: 'ASC',
      },
    });
  }

  async findAllByIsActiveProperty(isActive: boolean): Promise<User[]> {
    return this.userRepository.find({
      order: {
        points: 'DESC',
        username: 'ASC',
      },
      where: {
        isActive
      }
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.userRepository.count();
  }

  async update(userParam: User): Promise<UpdateResult> {
    const updatedUser = await this.userRepository.update(userParam.id, userParam);
    return updatedUser;
  }
}
