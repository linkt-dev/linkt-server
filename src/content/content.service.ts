import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberService } from '../member/member.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly memberService: MemberService,
  ) {}

  async createContent(title: string, link: string, category: string, userId: string) {
    const member = await this.memberService.getMemberByUserId(userId);
    return await this.contentRepository.save(
      Content.from({
        title: title,
        link: link,
        category: category,
        createdAt: new Date(),
        updatedAt: new Date(),
        member: member,
      }),
    );
  }

  async getContentById(id: number) {
    return await this.contentRepository.findOne({
      where: { id },
    });
  }

  async updateContent(id: number, title: string, link: string, category: string): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { id },
    });

    const newContent = {
      ...content,
      title,
      link,
      category,
      updatedAt: new Date(),
    };

    return await this.contentRepository.save(newContent);
  }

  async deleteContent(id: number) {
    return await this.contentRepository.delete({
      id: id,
    });
  }
}
