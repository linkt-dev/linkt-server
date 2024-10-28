import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async createContent(title: string, link: string, category: string) {
    return await this.contentRepository.save(
      Content.from({
        title: title,
        link: link,
        category: category,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  async getContentById(id: number) {
    return await this.contentRepository.findOne({
      where: { id },
    });
  }

  async updateContent(id: number, title: string, link: string, category: string) {
    const content = await this.contentRepository.findOne({
      where: { id },
    });

    const newContent = {
      ...content,
      title,
      link,
      category,
    };

    return await this.contentRepository.save(newContent);
  }

  async deleteContent(id: number) {
    return await this.contentRepository.delete({
      id: id,
    });
  }
}
