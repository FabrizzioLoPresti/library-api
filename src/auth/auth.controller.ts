import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const token = await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );

      res.status(HttpStatus.OK).json(token);
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
