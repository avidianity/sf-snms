import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import faker from 'faker';
import '@avidian/extras';
import { hash } from 'bcrypt';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		prismaService = app.get(PrismaService);
	});

	it('registers a user', async () => {
		const test = request(app.getHttpServer()).post('/auth/register').send({
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: String.random(),
		});

		await test.then(async (response) => {
			const { user } = response.body;

			await prismaService.token.deleteMany({
				where: {
					userId: user.id,
				},
			});

			await prismaService.user.delete({
				where: {
					id: user.id,
				},
			});
		});

		return test.expect(201);
	});

	it('logs a user in', async () => {
		const user = {
			email: faker.internet.email(),
			password: String.random(),
		};

		await prismaService.user.create({
			data: {
				...user,
				name: faker.name.findName(),
				password: await hash(user.password, 8),
			},
		});

		const test = request(app.getHttpServer())
			.post('/auth/login')
			.send(user);

		await test.then(async (response) => {
			const { user } = response.body;

			await prismaService.token.deleteMany({
				where: {
					userId: user.id,
				},
			});

			await prismaService.user.delete({
				where: {
					id: user.id,
				},
			});
		});

		return await test.expect(201);
	});

	afterAll(async () => {
		await app.close();
		await prismaService.$disconnect();
	});
});
