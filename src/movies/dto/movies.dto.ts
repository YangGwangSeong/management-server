import { IsString } from 'class-validator';

export class MovieDto {
	@IsString()
	name: string;

	@IsString()
	fees: number;

	@IsString()
	poster: string;
}
