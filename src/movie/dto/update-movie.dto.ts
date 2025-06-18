import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  @IsOptional()
  releaseYear: number;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean = false;
}
