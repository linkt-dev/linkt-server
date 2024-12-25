import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { MemberService } from '../member/member.service';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly configService: ConfigService,
    private readonly memberService: MemberService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
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
