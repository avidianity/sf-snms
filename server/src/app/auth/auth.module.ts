import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { HttpBearerStrategy } from './http-bearer.strategy';

@Module({
	imports: [PrismaModule, PassportModule],
	providers: [AuthService, HttpBearerStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
