import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { resolve } from 'path';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import mimeTypes from 'mime-types';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
		}),
		MulterModule.register({
			storage: diskStorage({
				destination: resolve(__dirname, '../storage'),
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
