import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ReviewModel } from 'src/reviews/reviews.model';

@Table({
	tableName: 'Movie',
	deletedAt: false,
	version: false,
})
export class MovieModel extends Model {
	@Column({ unique: true })
	name: string;

	@Column({ allowNull: true, type: 'float' })
	rating: number;

	@Column({ defaultValue: '' })
	poster: string;

	@Column({ defaultValue: 0 })
	fees: number;

	@HasMany(() => ReviewModel)
	reviews: ReviewModel[];
}
