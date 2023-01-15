import {
	Column,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { MovieModel } from 'src/movies/movies.model';
import { ReviewModel } from 'src/reviews/reviews.model';

@Table({
	tableName: 'View',
	deletedAt: false,
	version: false,
})
export class ViewModel extends Model<ViewModel> {
	@ForeignKey(() => MovieModel)
	@Column
	movieId: number;

	@Column({ defaultValue: 0 })
	views: number;
}
