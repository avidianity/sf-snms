import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import mimeTypes from 'mime-types';
import { STORAGE_PATH } from './constants';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
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
		PrismaModule,
		SocketModule,
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
