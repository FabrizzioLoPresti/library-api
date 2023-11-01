import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Author } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({
      data: {
        name: createAuthorDto.name,
      },
    });
  }

  async findAll(): Promise<Author[]> {
    return this.prisma.author.findMany({
      include: {
        BookToAuthor: {
          select: {
            book: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Author> {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
      include: {
        BookToAuthor: {
          select: {
            book: true,
          },
        },
      },
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.prisma.author.update({
      where: {
        id,
      },
      data: {
        name: updateAuthorDto.name,
      },
    });
  }

  async remove(id: number): Promise<Author> {
    return this.prisma.author.delete({
      where: {
        id,
      },
    });
  }
}
