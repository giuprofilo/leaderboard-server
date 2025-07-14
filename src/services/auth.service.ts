import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user/user.entity';
import { buildHtmlEmail, IHTMLParams } from './utils/emailBodyBuilder.util';
import { EmailService } from './email.service';
import { SendEmailDTO } from '../common/dtos/send-email.dto';
import { CodeVerifyService } from './code-verify.service';
import { getRandomCode } from './utils/getRandomCodeVerify.util';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly codeVerifyService: CodeVerifyService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByEmail(codeVerifyParam: string, userEmailParam: string) {
    if (!codeVerifyParam || !userEmailParam) {
      throw new UnauthorizedException('Parâmetros inválidos.');
    }

    const codeVerify = await this.codeVerifyService.findByCode(codeVerifyParam);
    const user = await this.userService.findByEmail(userEmailParam);
    if (!codeVerify || !user) {
      throw new UnauthorizedException('Dados de verificação inválidos.');
    }

    if (user.isActive) throw new ConflictException('Usuário já está verificado');

    const activedUser = await this.userService.update({
      ...user,
      isActive: true,
    });
    const activedUserIsValid: boolean | undefined =
      activedUser.affected !== undefined ||
      (activedUser.affected && activedUser.affected > 0);

    if (!activedUserIsValid) {
      throw new UnauthorizedException('Falha na autenticação. Tente novamente mais tarde.');
    }
  }

  async buildEmail(email: string, userId: string): Promise<SendEmailDTO> {
    const codeVerify = await this.codeVerifyService.findByUserId(userId);
    if (!codeVerify) {
      throw new NotFoundException(
        'Sua verificação falhou. Faça login novamente.',
      );
    }

    const htmlParams: IHTMLParams = {
      h3: this.configService.get('EMAIL_TITLE_H3')!,
      textButton: this.configService.get('EMAIL_TEXT_BUTTON')!,
      persistenceLink: `${this.configService.get('EMAIL_PERSISTENCE_LINK')!}${codeVerify.code}`,
      enterprise: this.configService.get('EMAIL_ENTERPRISE')!,
    };
    const recipients = [email];
    const subject = 'Leaderborad | Verificação';
    const html = buildHtmlEmail(htmlParams);
    const emailData = {
      recipients,
      subject,
      html,
    };

    return emailData;
  }

  async checkIfCodeVerifyUserIsValid(userId: string): Promise<void> {
    const codeVerify = await this.codeVerifyService.findByUserId(userId);

    if (codeVerify) {
      const verifyCodeIsValid =
        this.codeVerifyService.validateCodeVerifyExpirationTime(codeVerify);
      if (verifyCodeIsValid === false) {
        await this.codeVerifyService.remove(codeVerify.id);
        throw new ForbiddenException(
          'Código de verificação expirado. Por favor, faça login novamente para receber um novo código.',
        );
      }
      throw new ForbiddenException(
        'Código de verificação enviado. Por favor, verique a caixa de entrada do seu email.',
      );
    }
  }

  async getValidUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    if (!user?.isActive) {
      await this.checkIfCodeVerifyUserIsValid(user.id);
      const code: string = getRandomCode();
      await this.codeVerifyService.create({
        code,
        userId: user.id,
      });

      const emailDataBuilded = await this.buildEmail(email, user.id);
      this.emailService.sendEmail(emailDataBuilded);

      throw new ForbiddenException(
        'Usuário não verificado. Por favor, verifique seu email.',
      );
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.getValidUser(email, password);
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
