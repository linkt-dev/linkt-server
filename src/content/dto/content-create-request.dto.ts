import { ApiProperty } from '@nestjs/swagger';

export class ContentCreateRequestDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  link: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  category?: string;
}
