import { Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';

@Module({
	providers: [HardwareService],
	exports: [HardwareService],
})
export class HardwareModule {}
