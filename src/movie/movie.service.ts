import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: { isAvailable: true },
      order: {
        createdAt: 'desc', // отсортирует по убыванию по столбцу createdAt
      },
      take: 5, // сколько записей вернуть
      skip: 3, // сколько записей пропустить
      select: {
        // указывает список полей, которые надо вернуть
        id: true,
        title: false,
      },
    });
  }

  async findById(id: string): Promise<MovieEntity | null> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors'], // устанавливает связь с таблицей 'actors' чтобы при поиске фильма подтягивались и актеры привязанняе к нему
    });

    console.log('movie2', movie);

    if (!movie) throw new NotFoundException('Нет такого фильма');

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    // ищем всех актеров
    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Один или несколько актеров не найдены');

    let poster: MoviePosterEntity | null = null;

    if (imageUrl) {
      poster = this.moviePosterRepository.create({ imageUrl });
      await this.moviePosterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity | null> {
    const movie = await this.findById(id);

    if (!movie) return null;

    const updatedMovie = Object.assign(movie, dto);
    return await this.movieRepository.save(updatedMovie);
  }

  async delete(id: string): Promise<MovieEntity> {
    const movie = await this.findById(id);
    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    const result = await this.movieRepository.remove(movie);
    return result;
  }
}
