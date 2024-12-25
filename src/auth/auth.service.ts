import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly memberService: MemberService,
    private readonly configService: ConfigService,
  ) {}

  async login(userId: string) {
    const member = await this.memberService.getMemberByUserId(userId);
    const accessToken = await this.createAccessToken(member.userId);
    const refreshToken = await this.createRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
      userId,
    };
  }

  async createAccessToken(userId: string) {
    return await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: parseInt(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES')),
      },
    );
  }

  async createRefreshToken(userId: string) {
    return await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: parseInt(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES')),
      },
    );
  }
}
