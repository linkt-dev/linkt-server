import { Content } from '../content.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ContentResponseDto {
  @ApiProperty({
    type: 'number',
  })
  id: number;

  @ApiProperty({
    type: 'string',
  })
  title: string;

  @ApiProperty({
    type: 'string',
  })
  link: string;

  @ApiProperty({
    type: 'string',
  })
  category: string;

  @ApiProperty({
    type: 'string',
  })
  faviconUrl: string;

  @ApiProperty({
    type: 'string',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
  })
  updatedAt: Date;

  static from(entity: Content) {
    const response = new ContentResponseDto();
    response.id = entity.id;
    response.title = entity.title;
    response.link = entity.link;
    response.category = entity.category;
    response.faviconUrl = entity.faviconUrl;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    return response;
  }
}
