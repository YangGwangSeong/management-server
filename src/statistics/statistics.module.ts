import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewModel } from 'src/reviews/reviews.model';
import { MovieModel } from 'src/movies/movies.model';
import { ViewModel } from 'src/views/views.model';

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel, MovieModel, ViewModel])],
	controllers: [StatisticsController],
	providers: [StatisticsService],
})
export class StatisticsModule {}
