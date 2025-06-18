import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateActorDto {
  @IsString()
  name: string;

  // @IsNotEmpty()
  // @IsUUID()
  // actorId: string;
}
