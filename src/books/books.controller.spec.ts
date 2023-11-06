import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const responseMock: Response = {
    status: jest.fn(() => responseMock),
    send: jest.fn(),
  } as any;

  const mockBooks = [
    {
      id: 1,
      title: 'Harry Potter y la piedra filosofal',
      chapters: 7,
      pages: 652,
      BookToAuthor: [
        {
          author: {
            id: 1,
            name: 'J. K. Rowling',
          },
        },
        {
          author: {
            id: 2,
            name: 'Brandon Sanderson',
          },
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, PrismaService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBooks', () => {
    it('should return an array of books', async () => {
      // jest
      //   .spyOn(service, 'findAll')
      //   .mockImplementation(() => Promise.resolve(result));
      // expect(await controller.findAll(responseMock)).toBe(result);

      // jest.spyOn(service, 'findAll').mockResolvedValue(mockBooks);
      // const response = await controller.findAll(responseMock);
      // expect(response).toEqual(mockBooks);

      // await controller.findAll(responseMock);
      // expect(responseMock.status).toHaveBeenCalledWith(500);
      // expect(responseMock.send).toHaveBeenCalledWith({
      //   message: 'No books found',
      // });

      jest.spyOn(service, 'findAll').mockResolvedValue(mockBooks);
      await controller.findAll(responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.send).toHaveBeenCalledWith(mockBooks);
    });

    it('should handle error when no books are found', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        throw new Error('No books found');
      });

      await controller.findAll(responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(responseMock.send).toHaveBeenCalledWith({
        message: 'No books found',
      });
    });
  });
});
