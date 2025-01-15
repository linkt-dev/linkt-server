import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

const isProduction = process.env.NODE_ENV === 'production';

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
      domain: isProduction ? 'api.linkt.one' : 'dev-api.linkt.one',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: isProduction ? 'none' : 'none',
    });

    res.cookie('RefreshToken', result.refreshToken, {
      domain: isProduction ? 'api.linkt.one' : 'dev-api.linkt.one',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: isProduction ? 'none' : 'none',
    });

    return LoginResponseDto.from(result.userId);
  }

  @UseGuards(AuthGuard('refreshToken'))
  @Post('refresh')
  async restoreAccessToken(@Body() req: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.createAccessToken(req.userId);
    res.cookie('Authorization', accessToken, {
      domain: isProduction ? 'api.linkt.one' : 'dev-api.linkt.one',
      path: '/',
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });

    return LoginResponseDto.from(req.userId);
  }
}
