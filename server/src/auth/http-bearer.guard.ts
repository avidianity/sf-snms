import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HttpBearerGuard extends AuthGuard('http-bearer') {}
