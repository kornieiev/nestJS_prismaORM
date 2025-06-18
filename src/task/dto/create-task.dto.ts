import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { StartsWith } from '../decorators/starts-with.decorator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  @StartsWith('Task:')
  title: string;

  @IsBoolean()
  isComplited: boolean;
}
