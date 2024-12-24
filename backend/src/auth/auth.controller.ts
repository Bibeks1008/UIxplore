import { Body, Controller, Post } from '@nestjs/common';
import { AuthEmailDto, AuthVerifyDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/send-code')
  sendVerificationCode(@Body() dto: AuthEmailDto) {
    return this.authService.sendVerificationCode(dto);
  }

  @Post('/verify-code')
  verifyCode(@Body() dto: AuthVerifyDto) {
    return this.authService.verifyCode(dto);
  }
}
