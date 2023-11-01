import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, PrismaService],
})
export class AuthorsModule {}
