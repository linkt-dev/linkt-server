import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { ContentModule } from './content/content.module';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ContentModule,
    MemberModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
