import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  userId: string;
}
