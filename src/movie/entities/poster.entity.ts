import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity({ name: 'movie_posters' })
export class MoviePosterEntity {
  @PrimaryGeneratedColumn('uuid') // для автоматической генерации значения id
  id: string;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity;

  @CreateDateColumn({
    name: 'created_at',
  }) // для автоматической генерации даты при создании записи
  createdAt: Date;
}
