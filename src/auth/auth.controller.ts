import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() req: LoginRequestDto) {
    const accessToken = await this.authService.login(req.userId);
    return LoginResponseDto.from(accessToken);
  }
}
