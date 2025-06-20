import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('movies-QWE') // Если нужно задать кастомное имя для Swagger
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Получить список фильмов',
    description: 'Возвращает список со всеми фильмами',
  }) // добавит описание в Swagger
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильмы найдены',
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Создать фильм',
    description: 'Создает новую запись в списке фильмов',
  }) // добавит описание в Swagger
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string', example: 'Terminator' },
  //     },
  //   },
  // })
  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить фильм по ID',
    description: 'Возвращает фильм по ID',
  }) // добавит описание в Swagger
  @ApiParam({ name: 'id', type: 'string', description: 'ID фильма' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильм найден',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильм не найден',
  }) // актуально для поиска одного фильма, когда введен не верный id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
  ): Promise<Movie | null> {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Movie> {
    return this.movieService.delete(id);
  }
}
