import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getSequelizeConfig } from './config/db.config';
import { AuthModule } from './auth/auth.module';
import { ViewsModule } from './views/views.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MoviesModule } from './movies/movies.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getSequelizeConfig,
		}),
		AuthModule,
		MoviesModule,
		ReviewsModule,
		ViewsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
