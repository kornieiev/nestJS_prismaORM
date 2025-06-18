import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewEntity | null> {
    const { text, rating, movieId } = dto;

    console.log('dto', dto);

    const movie = await this.movieService.findById(movieId);

    console.log('movie', movie);

    if (!movie) return null;

    const review = this.reviewRepository.create({
      text,
      rating,
      movie,
    });

    return await this.reviewRepository.save(review);
  }
}
