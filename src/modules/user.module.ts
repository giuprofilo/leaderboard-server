import { Global, Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { userProviders } from 'src/database/providers';
import { UserSeeder } from 'src/database/seeders/user.seed';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository, UserSeeder, ...userProviders],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, UserRepository, ...userProviders],
})
export class UserModule {}
