import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewModel } from './reviews.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel])],
	controllers: [ReviewsController],
	providers: [ReviewsService],
})
export class ReviewsModule {}
