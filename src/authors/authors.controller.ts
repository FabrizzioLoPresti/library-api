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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto, @Res() res: Response) {
    try {
      const author = await this.authorsService.create(createAuthorDto);

      res.status(201).json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const authors = await this.authorsService.findAll();

      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const author = await this.authorsService.findOne(+id);

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Res() res: Response,
  ) {
    try {
      const author = await this.authorsService.update(+id, updateAuthorDto);

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const author = await this.authorsService.remove(+id);

      res.status(200).json({ message: 'Author deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
