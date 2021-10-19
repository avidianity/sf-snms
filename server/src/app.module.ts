import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './app/prisma/prisma.module';
import { SocketModule } from './app/socket/socket.module';
import { AuthModule } from './app/auth/auth.module';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './app/user/user.module';
import mimeTypes from 'mime-types';
import { STORAGE_PATH } from './constants';
import { HardwareModule } from './app/hardware/hardware.module';
import { DeviceModule } from './app/device/device.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
		}),
		MulterModule.register({
			storage: diskStorage({
				destination: STORAGE_PATH,
				filename: (_, { fieldname, mimetype, filename }, callback) => {
					const extension = mimeTypes.extension(mimetype);
					if (!extension) {
						return callback(
							new Error('Invalid extension.'),
							filename,
						);
					}
					callback(
						null,
						`${fieldname}-${String.random(40)}.${extension}`,
					);
				},
			}),
		}),
		ScheduleModule.forRoot(),
		PrismaModule,
		SocketModule,
		AuthModule,
		UserModule,
		HardwareModule,
		DeviceModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
