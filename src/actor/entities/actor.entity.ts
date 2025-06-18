import { MovieEntity } from 'src/movie/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('actors')
export class ActorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  movies: MovieEntity[];
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
