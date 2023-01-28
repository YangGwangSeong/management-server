import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { UserModel } from 'src/auth/users.model';
import { ReviewModel } from 'src/reviews/reviews.model';
import { MovieDto } from './dto/movies.dto';
import { MovieModel } from './movies.model';

@Injectable()
export class MoviesService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel,
	) {}

	async getMoviebyId(id: number, isPublic = false) {
		const movie = await this.movieModel.findOne({
			where: { id },
			include: [
				{
					model: ReviewModel,
					include: [UserModel],
				},
			],
		});
		if (!movie) throw new NotFoundException('Video not found');

		return movie;
	}

	async getMovieAll(searchTerm?: string) {
		let options: WhereOptions<MovieModel> = {};

		if (searchTerm) {
			options = {
				name: { [Op.like]: `%${searchTerm}%` },
			};
		}

		return this.movieModel.findAll({
			where: {
				...options,
			},
			order: [['createdAt', 'DESC']],
			include: [
				{
					all: true,
				},
			],
		});
	}

	async createMovie() {
		const movie = await this.movieModel.create();
		return movie.id;
	}

	async updateMovie(id: number, dto: MovieDto) {
		const movie = await this.getMoviebyId(id);

		return movie.update({
			...movie,
			...dto,
		});
	}

	async deleteMovie(id: number) {
		return this.movieModel.destroy({ where: { id } });
	}

	async updateCountViews(id: number) {}
}
