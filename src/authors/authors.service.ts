import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Author } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = await this.prisma.author.create({
      data: {
        name: createAuthorDto.name,
      },
    });

    if (!newAuthor) throw new Error('Author not created');

    return newAuthor;
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.prisma.author.findMany({
      include: {
        BookToAuthor: {
          select: {
            book: true,
          },
        },
      },
    });

    if (!authors) throw new Error('Authors not found');

    return authors;
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.prisma.author.findUnique({
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

    if (!author) throw new Error('Author not found');

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = await this.prisma.author.update({
      where: {
        id,
      },
      data: {
        name: updateAuthorDto.name,
      },
    });

    if (!updatedAuthor) throw new Error('Author not found');

    return updatedAuthor;
  }

  async remove(id: number): Promise<Author> {
    const removedUser = await this.prisma.author.delete({
      where: {
        id,
      },
    });

    if (!removedUser) throw new Error('Author not found');

    return removedUser;
  }
}
