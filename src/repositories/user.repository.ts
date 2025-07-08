import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
        isActive,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.userRepository.count();
  }

  async updatePoints(id: number, points: number): Promise<User> {
    await this.userRepository.update(id, { points });
    return this.findOne(id);
  }
}
