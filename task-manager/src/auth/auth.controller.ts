import { Controller, Post, HttpStatus, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { CreateUsertDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async loginUser(@Response() res: any, @Body() body: User) {
    if (!(body && body.username && body.password)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username and password are required!' });
    }

    const user = await this.usersService.getUserByUsername(body.username);

    if (user) {
      if (
        await this.usersService.compareHash(body.password, user.passwordHash)
      ) {
        return res
          .status(HttpStatus.OK)
          .json(await this.authService.createToken(user.id, user.username));
      }
    }

    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: 'Username or password wrong!' });
  }

  @Post('register')
  async registerUser(@Response() res: any, @Body() body: CreateUsertDto) {
    if (!body || !body.username || !body.password || !body.email) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username, password and email are required!' });
    }

    let user = await this.usersService.getUserByUsername(body.username);

    if (user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username exists' });
    } else {
      user = await this.usersService.createUser(body);
      if (user) {
        user.passwordHash = undefined;
      }
    }

    return res.status(HttpStatus.OK).json(user);
  }
}
