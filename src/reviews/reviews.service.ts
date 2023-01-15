import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewDto } from './dto/reviews.dto';
import { ReviewModel } from './reviews.model';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: typeof ReviewModel,
	) {}

	async createReview(userId: number, dto: ReviewDto) {
		return this.reviewModel.create({
			userId,
			...dto,
		});
	}
}
