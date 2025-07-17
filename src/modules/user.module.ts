import { Module, Global, forwardRef } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { userProviders } from 'src/database/providers';
import { UserSeeder } from 'src/database/seeders/user.seed';
import { CloudinaryModule } from './cloudinary.module';
import { CodeVerifyModule } from './code-verify.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CloudinaryModule,
    forwardRef(() => CodeVerifyModule),
  ],
  providers: [UserService, UserRepository, UserSeeder, ...userProviders],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, UserRepository, ...userProviders],
})
export class UserModule {}
