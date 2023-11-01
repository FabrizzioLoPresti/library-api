export class CreateBookDto {
  title: string;
  chapters: number;
  pages: number;
  authors: {
    authorId: number;
  }[];
}
