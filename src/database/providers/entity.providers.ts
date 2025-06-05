import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { USER_REPOSITORY } from './constants';

export const userProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (userRepository: Repository<User>) => userRepository,
    inject: [getRepositoryToken(User)],
  },
];
