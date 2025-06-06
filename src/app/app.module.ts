import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from '../modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AuthModule } from 'src/modules/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),

    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
