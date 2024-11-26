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
    return await this.createToken(member.userId);
  }

  async createToken(userId: string) {
    return await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: parseInt(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES')),
      },
    );
  }
}
