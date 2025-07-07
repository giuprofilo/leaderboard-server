import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user/user.entity';
import { buildHtmlEmail, IHTMLParams } from './utils/emailBodyBuilder.util';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const htmlParams: IHTMLParams = {
      h3: "Verifique-se",
	    textButton: "Clique aqui para verificar seu email",
	    persistenceLink: "http://localhost:4200/validation",
	    enterprise: "Tokenlab"
    }

    const recipients = [email]
    const subject = "Leaderborad | Verificação"
    const html = buildHtmlEmail(htmlParams);

    const sendEmailDTOBuilder = {
      recipients,
      subject,
      html
    }

    this.emailService.sendEmail(sendEmailDTOBuilder);

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
