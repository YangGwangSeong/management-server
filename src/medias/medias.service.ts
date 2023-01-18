import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MediaResponse } from './medias.interface';
@Injectable()
export class MediasService {
	async saveMedia(
		mediaFile: Express.Multer.File,
		folder = 'default',
	): Promise<MediaResponse> {
		const uploadFolder = `${path}/uploads/${folder}`;
		await ensureDir(uploadFolder);

		await writeFile(
			`${uploadFolder}/${mediaFile.originalname}`,
			mediaFile.buffer,
		);

		return {
			url: `/uploads/${folder}/${mediaFile.originalname}`,
			name: mediaFile.originalname,
		};
	}
}
