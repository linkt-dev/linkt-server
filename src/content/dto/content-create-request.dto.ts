import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  category?: string;
}
