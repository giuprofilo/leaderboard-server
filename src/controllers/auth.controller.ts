// import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/services/user.service';
// import * as bcrypt from 'bcrypt';
// import { LoginDto } from '../commons/dtos/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     const { email, password } = loginDto;

//     const user = await this.userService.findByEmail(email);

//     if (!user) {
//       throw new UnauthorizedException('Email ou senha estão incorretos');
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       throw new UnauthorizedException('Email ou senha estão incorretos');
//     }

//     const payload = { sub: user.id, email: user.email };
//     const token = this.jwtService.sign(payload);

//     return { access_token: token };
//   }
// }
