import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { createDummyUsers } from './utils/createDummyUsers.util';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { ISeedMessage } from 'src/common/interfaces/ISeedMessage.interface';

@Injectable()
export class UserSeeder {
  constructor(private readonly userService: UserService) {}

  async seed(numberOfUsers: number): Promise<ISeedMessage> {
    const dummyUsers: Array<CreateUserDto> = createDummyUsers(
      numberOfUsers || 1,
    );
    let numberOfSavedDummyUsers: number = 0;

    console.log('Seed Dummy Users: saving dummy users...');
    for (const dummyUser of dummyUsers) {
      try {
        await this.userService.createUser(dummyUser);
        numberOfSavedDummyUsers++;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error creating user: ${errorMessage}`);
      }
    }

    const message: string = `saved ${numberOfSavedDummyUsers}/${dummyUsers.length} dummy users.`;

    console.log(`Seed Dummy Users: ${message}`);
    return { message };
  }
}
