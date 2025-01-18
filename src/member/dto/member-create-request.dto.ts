import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MemberCreateRequestDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  uuid: string;
}
