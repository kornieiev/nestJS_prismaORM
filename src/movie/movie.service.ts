import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Actor } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Movie[]> {
    console.log('first');
    return await this.prismaService.movie.findMany({
      where: { isAvailable: true },
      orderBy: {
        createdAt: 'desc', // отсортирует по убыванию по столбцу createdAt
      },
      include: {
        actors: {
          select: { id: true, name: true },
        },
      },
      // pagination:
      take: 5, // сколько записей вернуть
      skip: 0, // сколько записей пропустить
    });
  }

  // 4:02:20 - получение фильма по id
  // https://youtu.be/HT6cm4GoSIw?t=14541
  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        actors: {
          select: { id: true, name: true },
        },
        poster: true,
        reviews: true,
      },
    });

    if (!movie || !movie.isAvailable)
      throw new NotFoundException('Нет такого фильма');
    return movie;
  }

  // 3:57:24 - создание записи с фильмом
  // https://youtu.be/HT6cm4GoSIw?t=14244
  async create(dto: CreateMovieDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;
    // ищем всех актеров
    const actors: Actor[] = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Один или несколько актеров не найдены');

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor: Actor) => ({
            id: actor.id,
          })),
        },
      },
      include: {
        actors: true,
        poster: true,
      },
    });

    console.log('movie', movie);

    return movie;
  }

  // 4:04:02 - обновление фильма по id
  // https://youtu.be/HT6cm4GoSIw?t=14644
  async update(id: string, dto: UpdateMovieDto): Promise<any | null> {
    // Проверяем, существует ли фильм
    const movie = await this.findById(id);
    if (!movie) return null;
    console.log('id', id);

    console.log('movie', movie);

    // Обновляем фильм через Prisma
    const updatedMovie = await this.prismaService.movie.update({
      where: { id },
      data: { ...dto },
      include: {
        actors: {
          select: { id: true, name: true },
        },
        poster: true,
      },
    });

    console.log('updatedMovie', updatedMovie);

    return updatedMovie;
  }

  // 4:07:57 - удаление фильма по id
  // https://youtu.be/HT6cm4GoSIw?t=14877
  async delete(id: string): Promise<Movie> {
    const movie = await this.findById(id);
    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }
    // Удаляем фильм через Prisma
    const deletedMovie = await this.prismaService.movie.delete({
      where: { id },
      include: {
        actors: {
          select: { id: true, name: true },
        },
        poster: true,
      },
    });
    return deletedMovie;
  }
}
