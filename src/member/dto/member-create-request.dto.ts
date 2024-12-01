import { ApiProperty } from '@nestjs/swagger';

export class MemberCreateRequestDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  uuid: string;
}
