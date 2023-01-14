import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { MovieModel } from 'src/movies/movies.model';
import { UserModel } from 'src/auth/users.model';

@Table({
	tableName: 'Review',
	deletedAt: false,
	version: false,
})
export class ReviewModel extends Model {
	@Column({ defaultValue: '' })
	description: string;

	@ForeignKey(() => UserModel)
	@Column
	userId: number;

	@BelongsTo(() => UserModel)
	user: UserModel;

	@ForeignKey(() => MovieModel)
	@Column
	movieId: number;

	@BelongsTo(() => MovieModel)
	movie: MovieModel;
}
