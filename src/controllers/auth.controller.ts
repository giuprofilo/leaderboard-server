import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/common/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return await this.authService.login(email, password);
  }

  @Get('validateUserByEmail')
  async validateUserByEmail(
    @Query('codeVerify') codeVerify: string,
    @Query('userEmail') userEmail: string,
  ) {
    return await this.authService.validateUserByEmail(codeVerify, userEmail);
  }
}
