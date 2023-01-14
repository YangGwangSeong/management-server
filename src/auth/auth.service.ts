import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './users.model';

import { compare, genSalt, hash } from 'bcryptjs';
@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private readonly userModel: typeof UserModel,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(String(user.id)),
		};
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userModel.findOne({
			where: { email: dto.email },
			attributes: ['id', 'email', 'password'],
		});
		if (!user) throw new UnauthorizedException('User not found');

		const isValidPassword = await compare(dto.password, user.password);
		if (!isValidPassword) throw new UnauthorizedException('Invalid password');

		return user;
	}

	async issueAccessToken(userId: string) {
		const data = { id: userId };

		return await this.jwtService.signAsync(data, {
			expiresIn: '31d',
		});
	}

	returnUserFields(user: UserModel) {
		return {
			id: user.id,
			email: user.email,
		};
	}
}
