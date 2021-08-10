import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SocketService } from './socket.service';

@Module({
	imports: [AuthModule],
	providers: [SocketService],
	exports: [SocketService],
})
export class SocketModule {}
