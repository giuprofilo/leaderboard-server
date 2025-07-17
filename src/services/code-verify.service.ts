import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeVerify } from '../entities/user/code-verify.entity';
import { CreateCodeVerifyDTO } from '../common/dtos/create-code-verify.dto';
import { validateMinutes } from './utils/validateMinutes.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CodeVerifyService {
  constructor(
    @InjectRepository(CodeVerify)
    private readonly codeVerifyRepository: Repository<CodeVerify>,
    private readonly configService: ConfigService,
  ) {}

  async create(createCodeVerifyDto: CreateCodeVerifyDTO): Promise<CodeVerify> {
    const codeVerify = this.codeVerifyRepository.create({
      code: createCodeVerifyDto.code,
      user: { id: createCodeVerifyDto.userId },
    });
    return await this.codeVerifyRepository.save(codeVerify);
  }

  async findByUserId(userId: string): Promise<CodeVerify | null> {
    return await this.codeVerifyRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.codeVerifyRepository.delete(id);
  }

  validateCodeVerifyExpirationTime(codeVerify: CodeVerify): boolean {
    const expirationTime: number =
      +this.configService.get('EXPIRATION_TIME') || 5;
    const timezoneHours: number =
      +this.configService.get('TIMEZONE_HOURS') || 3;
    return validateMinutes(codeVerify.createdAt, expirationTime, timezoneHours);
  }

  async findByCode(code: string): Promise<CodeVerify | null> {
    return await this.codeVerifyRepository.findOne({
      where: { code },
    });
  }
}
