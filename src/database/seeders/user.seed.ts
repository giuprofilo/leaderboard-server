import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserSeeder {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // ToDo
  }
}
