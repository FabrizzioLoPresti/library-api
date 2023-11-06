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
    if (!newBook) throw new Error('Book not created');

    return newBook;
  }

  async findAll(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      include: {
        BookToAuthor: {
          select: {
            author: true,
          },
        },
      },
    });

    if (!books || books.length === 0) throw new Error('No books found');

    return books;
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({
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

    if (!book) throw new Error('Book not found');

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.prisma.book.update({
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

    if (!updatedBook) throw new Error('Book not found');

    return updatedBook;
  }

  async remove(id: number): Promise<Book> {
    const removedBook = await this.prisma.book.delete({
      where: {
        id,
      },
    });

    if (!removedBook) throw new Error('Book not found');

    return removedBook;
  }
}
