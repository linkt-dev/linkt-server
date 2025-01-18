import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  userId: string;
}
