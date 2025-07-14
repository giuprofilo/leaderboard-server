import { Repository } from 'typeorm';
import { CodeVerify } from '../entities/user/code-verify.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CODE_VERIFY } from 'src/database/providers/constants';
import { CreateCodeVerifyDTO } from 'src/common/dtos/create-code-verify.dto';

@Injectable()
export class UserRepository {
	constructor(
		@Inject(CODE_VERIFY)
		private readonly codeVerifyRepository: Repository<CodeVerify>
	) {}

	async createCodeVerify(codeVerify: CreateCodeVerifyDTO): Promise<CodeVerify> {
		return this.codeVerifyRepository.create(codeVerify);
	}

  async findById(id: string): Promise<CodeVerify | null> {
    return await this.codeVerifyRepository.findOne({ where: { id } })
  }

  async findByUserId(userId: string): Promise<CodeVerify | null> {
    return this.codeVerifyRepository.findOne({ 
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

	async removeCodeVerify(id: string): Promise<void> {
		this.codeVerifyRepository.delete(id);
	}
}