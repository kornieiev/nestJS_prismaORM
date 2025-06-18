import { MovieEntity } from 'src/movie/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryColumn() // для автоматической генерации значения id
  @Generated('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  // Связь ManyToOne:
  @Column({ name: 'movie_id', type: 'uuid' })
  movieId: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
  //

  @CreateDateColumn({
    name: 'created_at',
  }) // для автоматической генерации даты при создании записи
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  }) // для автоматической генерации даты при обновлении записи
  updatedAt: Date;
}
