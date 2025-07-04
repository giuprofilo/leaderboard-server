import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeVerify } from '../entities/user/code-verify.entity';
import { CreateCodeVerifyDTO } from '../common/dtos/create-code-verify.dto';

@Injectable()
export class CodeVerifyService {
  constructor(
    @InjectRepository(CodeVerify)
    private readonly codeVerifyRepository: Repository<CodeVerify>,
  ) {}

  async create(createCodeVerifyDto: CreateCodeVerifyDTO): Promise<CodeVerify> {
    const codeVerify = this.codeVerifyRepository.create({
      ...createCodeVerifyDto,
    });
    return await this.codeVerifyRepository.save(codeVerify);
  }

  async findByUserId(userId: string): Promise<CodeVerify | null> {
    return await this.codeVerifyRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async remove(id: string): Promise<void> {
    await this.codeVerifyRepository.delete(id);
  }
}