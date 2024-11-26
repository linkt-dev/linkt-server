import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { MemberService } from '../member/member.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor(
    private readonly configService: ConfigService,
    private readonly memberService: MemberService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithm: 'HS256',
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: { userId: string }) {
    const member = await this.memberService.getMemberByUserId(payload.userId);
    if (!member) {
      throw new UnauthorizedException('no existing member');
    }
    return {
      userId: payload.userId,
    };
  }
}
