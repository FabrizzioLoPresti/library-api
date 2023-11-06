import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);

      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();

      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(+id);

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.remove(+id);

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
