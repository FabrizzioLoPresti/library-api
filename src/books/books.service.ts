import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = await this.prisma.book.create({
      data: {
        title: createBookDto.title,
        chapters: createBookDto.chapters,
        pages: createBookDto.pages,
        BookToAuthor: {
          create: createBookDto.authors.map((author) => ({
            authorId: author.authorId,
          })),
        },
      },
      include: {
        BookToAuthor: {
          select: {
            author: true,
          },
        },
      },
    });

    // createBookDto.authors.map(async (author) => {
    //   await this.prisma.bookToAuthor.create({
    //     data: {
    //       authorId: author.authorId,
    //       bookId: newBook.id,
    //     },
    //   });
    // });

    this.prisma.$disconnect();
    return newBook;
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany({
      include: {
        BookToAuthor: {
          select: {
            author: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Book> {
    return this.prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        BookToAuthor: {
          select: {
            author: true,
          },
        },
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.prisma.book.update({
      where: {
        id,
      },
      data: {
        title: updateBookDto.title,
        chapters: updateBookDto.chapters,
        pages: updateBookDto.pages,
        BookToAuthor: {
          // Upsert y delete
          deleteMany: {},
          create: updateBookDto.authors.map((author) => ({
            authorId: author.authorId,
          })),
        },
      },
      include: {
        BookToAuthor: {
          select: {
            author: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Book> {
    return this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
