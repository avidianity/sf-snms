import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SocketService } from './socket/socket.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	app.enableCors({
		credentials: true,
		origin: (origin, callback) => callback(null, origin),
	});

	const prismaService = app.get(PrismaService);

	prismaService.enableShutdownHooks(app);

	const socketService = app.get(SocketService);

	socketService.setup(app.getHttpServer());

	const config = new DocumentBuilder()
		.setTitle('SF-SNMS')
		.setDescription('Smart Farming: A Soil Nutrient Monitoring System')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT || 8000, () => {
		console.log('\nServer Running');
	});
}

bootstrap().catch(console.error);
