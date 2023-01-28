import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn } from 'sequelize';
import { MovieModel } from 'src/movies/movies.model';
import { ReviewModel } from 'src/reviews/reviews.model';
import { ViewModel } from 'src/views/views.model';

@Injectable()
export class StatisticsService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel,

		@InjectModel(ReviewModel)
		private readonly reviewModel: typeof ReviewModel,

		@InjectModel(ViewModel)
		private readonly viewModel: typeof ViewModel,
	) {}

	async getMainStatistics() {
		const countReviews = await this.reviewModel.count();
		const countMovies = await this.movieModel.count();

		const views = await this.viewModel
			.findAll({
				attributes: [[fn('sum', col('views')), 'views']],
			})
			.then((data) => Number(data[0].views as any));

		const averageRating = await this.movieModel
			.findAll({
				attributes: [[fn('avg', col('rating')), 'rating']],
			})
			.then((data) => Number(data[0].rating.toFixed(1)));

		return {
			countReviews,
			countMovies,
			views,
			averageRating,
		};
	}
}
