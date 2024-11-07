import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberModule } from '../member/member.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [MemberModule, JwtModule.register({ global: true }), ConfigModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
