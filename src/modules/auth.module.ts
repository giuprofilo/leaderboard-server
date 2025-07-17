import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { UserModule } from 'src/modules/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { EmailModule } from './email.module';
import { CodeVerifyModule } from './code-verify.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    EmailModule,
    CodeVerifyModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
