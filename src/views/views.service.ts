import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ViewModel } from './views.model';
import { fn, col, where, Op } from 'sequelize';
import * as dayjs from 'dayjs';

@Injectable()
export class ViewsService {
	constructor(
		@InjectModel(ViewModel)
		private readonly viewModel: typeof ViewModel,
	) {}

	async updateViews(movieId: number) {
		const row = await this.viewModel.findOne({
			where: {
				movieId,
				[Op.and]: [
					fn('EXTRACT(MONTH from "createdAt") =', dayjs().get('month') + 1),
				],
			},
		});

		if (row) {
			return row.increment('views');
		}

		return this.viewModel.create({
			movieId,
		});
	}
}
