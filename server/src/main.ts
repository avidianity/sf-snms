import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './app/prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SocketService } from './app/socket/socket.service';
import '@avidian/extras';
import { json, urlencoded } from 'express';
import { HardwareExceptionFilter } from './exceptions/filters/hardware.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(urlencoded({ extended: true }));
	app.use(json());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	app.useGlobalFilters(new HardwareExceptionFilter());
	app.enableCors({
		credentials: true,
		origin: (origin, callback) => callback(null, origin),
	});

	const prismaService = app.get(PrismaService);

	prismaService.enableShutdownHooks(app);

	const socketService = app.get(SocketService);

	socketService.setup(app.getHttpServer());

	const config = new DocumentBuilder()
		.setTitle('SNMS')
		.setDescription('Smart Farming: A Soil Nutrient Monitoring System')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const port = process.env.PORT ? process.env.PORT.toNumber() : 8000;

	await app.listen(port, () => {
		console.log('\nServer Running', port);
	});
}

bootstrap().catch(console.error);
