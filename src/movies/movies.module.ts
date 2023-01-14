import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieModel } from './movies.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [SequelizeModule.forFeature([MovieModel])],
	controllers: [MoviesController],
	providers: [MoviesService],
})
export class MoviesModule {}
