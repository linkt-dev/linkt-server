import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberModule } from '../member/member.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
  imports: [MemberModule, ConfigModule, JwtModule.register({ global: true })],
  providers: [AuthService, JwtService, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
