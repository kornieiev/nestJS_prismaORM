import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from 'generated/prisma';

// https://youtu.be/HT6cm4GoSIw?t=13902
// 3:51:36 - создание запроса для создания записи в БД в таблицу Actors

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;

    const actor: Actor = await this.prismaService.actor.create({
      data: {
        name,
      },
    });

    return actor;
  }
}
