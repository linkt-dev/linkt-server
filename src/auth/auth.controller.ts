import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() req: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(req.userId);
    res.cookie('Authorization', result.accessToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
    return LoginResponseDto.from(result.userId);
  }
}
