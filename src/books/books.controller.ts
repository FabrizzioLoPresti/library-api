import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    try {
      const book = await this.booksService.create(createBookDto);

      if (!book) throw new Error('Book not created');

      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const books = await this.booksService.findAll();

      if (!books || books.length === 0) throw new Error('No books found');

      res.status(200).send(books);
      // return books;
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const book = await this.booksService.findOne(+id);

      if (!book) throw new Error('Book not found');

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    try {
      const book = await this.booksService.update(+id, updateBookDto);

      if (!book) throw new Error('Book not found');

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const book = await this.booksService.remove(+id);

      if (!book) throw new Error('Book not found');

      res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get('/average/:id')
  async getAverageRating(@Param('id') id: string, @Res() res: Response) {
    try {
      const book = await this.booksService.findOne(+id);

      if (!book) throw new Error('Book not found');

      res.status(200).json({
        id: book.id.toString(),
        average: (book.pages / book.chapters).toFixed(2),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
