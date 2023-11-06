import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: createUserDto,
    });

    if (!userCreated) throw new Error('User not created');

    return userCreated;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    if (!users) throw new Error('Users not found');

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const userName = await this.prisma.user.findFirst({
      where: { name: username },
    });

    if (!userName) throw new Error('User not found');

    return userName;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!userUpdated) throw new Error('User not found');

    return userUpdated;
  }

  async remove(id: number): Promise<User> {
    const userRemoved = await this.prisma.user.delete({
      where: { id },
    });

    if (!userRemoved) throw new Error('User not found');

    return userRemoved;
  }
}
