import { ApiProperty } from '@nestjs/swagger';

export class MemberUpdateRequestDto {
  @ApiProperty({
    type: 'string',
  })
  expoPushToken?: string;
}
