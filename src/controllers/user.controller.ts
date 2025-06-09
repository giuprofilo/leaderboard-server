import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

import { User } from 'src/entities/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UserSeeder } from 'src/database/seeders/user.seed';
import { ISeedMessage } from 'src/common/interfaces/ISeedMessage.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSeed: UserSeeder
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('seed/:numberOfDummyUsers')
  async seed(@Param('numberOfDummyUsers') numberOfDummyUsers: number): Promise<ISeedMessage> {
    console.log(numberOfDummyUsers)
    return this.userSeed.seed(+numberOfDummyUsers);
  }
}
