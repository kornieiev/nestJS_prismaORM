import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from 'generated/prisma';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  // 4:09:21 - создание записи с review
  // https://youtu.be/HT6cm4GoSIw?t=14961
  async create(dto: CreateReviewDto): Promise<Review | null> {
    const { text, rating, movieId } = dto;
    console.log('dto', dto);
    const movie = await this.prismaService.movie.findUnique({
      where: { id: movieId },
    });
    console.log('movie-review', movie);
    if (!movie) return null;
    const review = this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: { id: movieId },
        },
      },
    });
    console.log('review', review);

    return review;
  }
}
