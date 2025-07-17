import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendEmailDTO } from 'src/common/dtos/send-email.dto';
import { EmailService } from 'src/services/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  async sendEmail(@Body() bodyEmail: SendEmailDTO) {
    const sentEmail = await this.emailService.sendEmail(bodyEmail);
    return sentEmail;
  }
}
