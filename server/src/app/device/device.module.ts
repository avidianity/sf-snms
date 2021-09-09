import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DeviceService } from './device.service';

@Module({
	providers: [DeviceService],
	imports: [PrismaModule],
	exports: [DeviceService],
})
export class DeviceModule {}
