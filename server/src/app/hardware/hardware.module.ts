import { forwardRef, Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { DeviceModule } from '../device/device.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	providers: [HardwareService],
	imports: [forwardRef(() => DeviceModule), PrismaModule],
	exports: [HardwareService],
	controllers: [HardwareController],
})
export class HardwareModule {}
