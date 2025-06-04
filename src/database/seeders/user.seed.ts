import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserSeeder {
  constructor(private readonly userService: UserService) {}

  async seed() {
		const NUMBER_OF_USERS = 50;
    const usersToSeed = 'createDummyUsers(NUMBER_OF_USERS)';
    const createdUser = await this.userService.signup(user);
  }
}
