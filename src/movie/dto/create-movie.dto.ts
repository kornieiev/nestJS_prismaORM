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
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @IsString()
  @IsUrl()
  imageUrl: string;
}
