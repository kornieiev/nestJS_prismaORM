import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  // @Post()
  // create(@Body() dto: CreateMovieDto) {
  //   return this.movieService.create(dto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.movieService.findById(id);
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateMovieDto,
  // ): Promise<MovieEntity | null> {
  //   return this.movieService.update(id, dto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<MovieEntity> {
  //   return this.movieService.delete(id);
  // }
}
