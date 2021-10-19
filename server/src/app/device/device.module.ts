import { forwardRef, Module } from '@nestjs/common';
import { HardwareModule } from '../hardware/hardware.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DeviceService } from './device.service';

@Module({
	providers: [DeviceService],
	imports: [PrismaModule, forwardRef(() => HardwareModule)],
	exports: [DeviceService],
})
export class DeviceModule {}
