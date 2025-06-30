import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDTO } from 'src/common/dtos/send-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {} // Corrigi o typo no nome 'congigService'

  emailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: +this.configService.get<string>('EMAIL_PORT')!,
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    return transporter;
  }

	async sendEmail(dto: SendEmailDTO) {
		const { recipients, subject, html } = dto;

		const transport = this.emailTransport();

		const options: nodemailer.SendMailOptions = {
			from: this.configService.get<string>('EMAIL_EMAIL'),
			to: recipients,
			subject,
			html,
		};

		try {
			await transport.sendMail(options);
			console.log('Email enviado com sucesso');
		} catch (error) {
			console.error(`Erro ao enviar email: ${error}`)
		}
	}
}