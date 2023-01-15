import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ViewModel } from './views.model';
import { fn, col, where, Op } from 'sequelize';
@Injectable()
export class ViewsService {
	constructor(
		@InjectModel(ViewModel)
		private readonly viewModel: typeof ViewModel,
	) {}

	async updateViews(movieId: number) {
		const row = await this.viewModel.findOne({
			where: {
				[Op.and]: [where(fn('month', col('createdAt')), 3)],
			},
		});

		if (row) {
			return this.viewModel.create({
				movieId,
			});
		}

		return row.update({
			views: row.views++,
		});
	}
}
