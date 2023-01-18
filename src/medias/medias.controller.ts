import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
	constructor(private readonly mediasService: MediasService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	@UseInterceptors(FileInterceptor('media'))
	async uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string,
	) {
		return this.mediasService.saveMedia(mediaFile, folder);
	}
}
