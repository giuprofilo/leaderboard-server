import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/common/dtos/login.dto';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth/google-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

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

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Query('email') email: string) {
    return await this.authService.loginByGoogle(email);
  }
}
