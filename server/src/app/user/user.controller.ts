import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { HttpBearerGuard } from '../auth/http-bearer.guard';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(HttpBearerGuard)
export class UserController {
	constructor(protected readonly user: UserService) {}

	@Get('/')
	all() {
		return this.user.all();
	}

	@Get('/:id')
	show(@Param('id') id: number) {
		return this.user.show(id);
	}

	@Post('/')
	create(@Body() data: CreateDTO) {
		return this.user.create(data);
	}

	@Put('/:id')
	update(@Param('id') id: number, @Body() data: UpdateDTO) {
		return this.user.update(id, data);
	}

	@Delete('/:id')
	delete(@Param('id') id: number) {
		return this.user.delete(id);
	}
}
