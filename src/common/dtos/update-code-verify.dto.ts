import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeVerifyDTO } from './create-code-verify.dto';

export class UpdateCodeVerifyDto extends PartialType(CreateCodeVerifyDTO) {}
