import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModel } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWTStrategy } from './strategies/auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/config/jwt.config';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		SequelizeModule.forFeature([UserModel]),
	],
	controllers: [AuthController],
	providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
