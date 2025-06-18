import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MoviePosterEntity } from './poster.entity';

export enum Genre {
  ACTION = 'action',
  DRAMA = 'drama',
  HORROR = 'horror',
}

@Entity('movies') // { name: 'movies' }
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid') // для автоматической генерации значения id
  id: string;

  @Column({
    type: 'varchar',
    // length: 128,
  }) // для отображения поля в виде колонки в таблице
  title: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.DRAMA,
  })
  genre: string;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'release_year',
  })
  releaseYear: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_available',
  })
  isAvailable: boolean;

  // OneToMany:
  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  // ManyToMany:
  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors', // имя промежуточной таблицы
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' }, // колонка, которая ссылается на фильм
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }, // колонка, которая ссылается на актера
  })
  actors: ActorEntity[];

  // poster_id - столбец для связи с таблицей "poster"
  @Column({ name: 'poster_id', type: 'uuid', nullable: true })
  poster_id: string;

  // OneToOne
  @OneToOne(() => MoviePosterEntity, (poster) => poster.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;

  @CreateDateColumn({
    name: 'created_at',
  }) // для автоматической генерации даты при создании записи
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  }) // для автоматической генерации даты при обновлении записи
  updatedAt: Date;
}
