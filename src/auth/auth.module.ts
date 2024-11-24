import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberModule } from '../member/member.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtAccessStrategy } from './jwt-access.strategy';

@Module({
  imports: [MemberModule, JwtModule.register({ global: true }), ConfigModule],
  providers: [AuthService, JwtService, JwtAccessStrategy],
  controllers: [AuthController],
  exports: [JwtAccessStrategy],
})
export class AuthModule {}
