import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({ description: 'Author ID' })
  authorId: number;
}

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book' })
  title: string;

  @ApiProperty({ description: 'Number of chapters in the book' })
  chapters: number;

  @ApiProperty({ description: 'Total number of pages in the book' })
  pages: number;

  @ApiProperty({
    description: 'Array of authors for the book',
    type: [AuthorDto],
  })
  authors: AuthorDto[];
}
