import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ReviewModel } from 'src/reviews/reviews.model';

@Table({
	tableName: 'User',
	deletedAt: false,
	version: false,
})
export class UserModel extends Model {
	@Column
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ field: 'avatar_path' })
	avatarPath: string;

	@HasMany(() => ReviewModel)
	reviews: ReviewModel[];
}