import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeVerifyService } from '../services/code-verify.service';
import { CodeVerify } from '../entities/user/code-verify.entity';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodeVerify]),
    forwardRef(() => UserModule),
  ],
  providers: [CodeVerifyService],
  exports: [CodeVerifyService],
})
export class CodeVerifyModule {}
