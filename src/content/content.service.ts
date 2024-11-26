import { Between, Repository } from 'typeorm';
import { Content } from './content.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberService } from '../member/member.service';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly memberService: MemberService,
    private readonly httpService: HttpService,
  ) {}

  async createContent(category: string, link: string, userId: string, title?: string) {
    const member = await this.memberService.getMemberByUserId(userId);
    if (!member) {
      throw new HttpException('Unauthorized', HttpStatus.NOT_FOUND);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const contents = await this.contentRepository.find({
      where: {
        member: member,
        createdAt: Between(today, tomorrow),
      },
    });

    if (contents.some((content) => content.link === link)) {
      throw new HttpException(
        { errMsg: 'Content with the same link has already been uploaded today' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (contents.length >= 3) {
      throw new HttpException({ errMsg: 'Upload limit of three contents reached for today' }, HttpStatus.BAD_REQUEST);
    }

    if (!title) {
      const response = await this.httpService.axiosRef.get(link, {
        responseType: 'text',
      });
      const $ = cheerio.load(response.data);

      title = $('title').text();
    }

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
