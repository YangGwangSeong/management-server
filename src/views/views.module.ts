import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewModel } from './views.model';

@Module({
	imports: [SequelizeModule.forFeature([ViewModel])],
	controllers: [ViewsController],
	providers: [ViewsService],
})
export class ViewsModule {}
