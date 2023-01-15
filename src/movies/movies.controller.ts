import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MovieDto } from './dto/movies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get(':id')
	async getMoviebyId(@Param('id') id: string) {
		return this.moviesService.getMoviebyId(+id);
	}

	@Get()
	async getMovieAll(@Query('searchTerm') searchTerm?: string) {
		return this.moviesService.getMovieAll(searchTerm);
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createMovie() {
		return this.moviesService.createMovie();
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateMovie(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.moviesService.updateMovie(+id, dto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteMovie(@Param('id') id: string) {
		return this.moviesService.deleteMovie(+id);
	}
}
