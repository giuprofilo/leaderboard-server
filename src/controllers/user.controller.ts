import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Query,
  Patch,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

import { User } from 'src/entities/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UserSeeder } from 'src/database/seeders/user.seed';
import { ISeedMessage } from 'src/common/interfaces/ISeedMessage.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { getRandomNumber } from 'src/database/seeders/utils/createDummyUsers.util';
import { UpdatePointsDto } from 'src/common/dtos/update-points.dto';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userSeed: UserSeeder,
  ) {}

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return callback(
            new BadRequestException(
              'Apenas arquivos JPG, JPEG, PNG ou GIF são permitidos',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async signup(
    @Body() body: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<User> {
    const createUserDto: CreateUserDto = {
      ...body,
      points: getRandomNumber(),
    };
    return this.userService.createUserWithAvatar(createUserDto, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query('isActive') isActive: boolean): Promise<User[]> {
    return this.userService.findAll(isActive);
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

  @UseGuards(AuthGuard('jwt'))
  @Patch('points')
  async updatePoints(
    @Req() req: AuthRequest,
    @Body() updatePointsDto: UpdatePointsDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateUserPoints(+userId, updatePointsDto.points);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('seed/:numberOfDummyUsers')
  async seed(
    @Param('numberOfDummyUsers') numberOfDummyUsers: number,
  ): Promise<ISeedMessage> {
    return this.userSeed.seed(+numberOfDummyUsers);
  }
}
