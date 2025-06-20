import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsArray,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Название фильма',
    example: 'Stranger Things',
    type: String,
  })
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  @ApiProperty({
    description: 'Дата релиза',
    example: 2020,
    type: Number,
  })
  releaseYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  @ApiPropertyOptional({
    description: 'Список ID актеров',
    example: [
      '6a19fc38-fb2f-4c78-8a9e-b0ae8b0d4b06',
      'd9a7aaaa-d495-4cfa-99d8-b428c1f38b4c',
    ],
    type: [String],
  })
  actorIds: string[];

  @IsString()
  @IsUrl()
  @ApiPropertyOptional({
    description: 'ссылка на изображение',
    example:
      'https://en.wikipedia.org/wiki/Stranger_Things#/media/File:Stranger_Things_logo.png',
    type: String,
  })
  imageUrl: string;
}
