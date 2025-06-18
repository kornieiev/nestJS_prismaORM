import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  title: string;

  @IsBoolean()
  @IsOptional()
  isComplited: boolean;
}
