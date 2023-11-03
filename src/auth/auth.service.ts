import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const isPasswordValid = await user.validatePassword(pass);
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const { password, ...result } = user;
    const payload = { sub: user.id, username: user.name };

    // return result;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
