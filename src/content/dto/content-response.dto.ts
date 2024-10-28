import { Content } from '../content.entity';

export class ContentResponseDto {
  id: number;

  title: string;

  link: string;

  category: string;

  createdAt: Date;

  updatedAt: Date;

  static from(entity: Content) {
    const response = new ContentResponseDto();
    response.id = entity.id;
    response.title = entity.title;
    response.link = entity.link;
    response.category = entity.category;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    return response;
  }
}
