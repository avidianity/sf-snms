import { Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { DeviceModule } from '../device/device.module';

@Module({
	providers: [HardwareService],
	imports: [DeviceModule],
	exports: [HardwareService],
	controllers: [HardwareController],
})
export class HardwareModule {}
