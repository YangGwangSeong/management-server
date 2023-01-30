import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn, literal } from 'sequelize';
import { MovieModel } from 'src/movies/movies.model';
import { ReviewModel } from 'src/reviews/reviews.model';
import { ViewModel } from 'src/views/views.model';
import { StatisticItemType } from './statistics.interface';

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

	async getMainStatistics(): Promise<StatisticItemType[]> {
		const countReviews = await this.reviewModel.count();
		const countMovies = await this.movieModel.count();

		const views = await this.viewModel
			.findAll({
				attributes: [[fn('sum', col('views')), 'views']],
			})
			.then((data) => Number(data[0].views));

		const averageRating = await this.movieModel
			.findAll({
				attributes: [[fn('avg', col('rating')), 'rating']],
			})
			.then((data) => Number(data[0].rating.toFixed(1)));

		return [
			{
				id: 1,
				name: 'Views',
				value: views,
			},
			{
				id: 2,
				name: 'Average rating',
				value: averageRating,
			},
			{
				id: 3,
				name: 'Movies',
				value: countMovies,
			},
			{
				id: 4,
				name: 'Reviews',
				value: countReviews,
			},
		];
	}

	async getMiddleStatistics() {
		const totalFees = await this.movieModel
			.findAll({
				attributes: [[fn('sum', col('fees')), 'fees']],
			})
			.then((data) => Number(data[0].fees));

		const viewsByMonth = await this.viewModel.findAll({
			attributes: [
				[fn('sum', col('views')), 'views'],
				[fn('date_trunc', 'month', col('createdAt')), 'month'],
			],
			group: 'month',
		});

		return {
			totalFees,
			viewsByMonth,
		};
	}
}
