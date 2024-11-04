import { ContentService } from './content.service';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/member.entity';
import { MemberService } from '../member/member.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ContentService', () => {
  let service: ContentService;
  let repository: Repository<Content>;
  let memberSerivce: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Content, Member],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Content, Member]),
      ],
      providers: [ContentService, MemberService],
    }).compile();

    service = module.get<ContentService>(ContentService);
    repository = module.get<Repository<Content>>(getRepositoryToken(Content));
    memberSerivce = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create content', async () => {
    const title = 'developer roadmap';
    const category = 'youtube';
    const link = 'https://youtube.com';

    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';
    const member = await memberSerivce.createMember(uuid);

    const createdContent = await service.createContent(title, category, link, member.userId);
    const getContent = await repository.findOne({ where: { id: createdContent.id } });
    expect(getContent.id).toEqual(createdContent.id);
    expect(getContent.link).toEqual(createdContent.link);
    expect(getContent.title).toEqual(createdContent.title);
    expect(getContent.category).toEqual(createdContent.category);
  });

  it('upload content over three should throw error', async () => {
    const title = 'developer roadmap';
    const category = 'youtube';
    const link = 'https://youtube.com1';
    const link2 = 'https://youtube.com2';
    const link3 = 'https://youtube.com3';
    const link4 = 'https://youtube.com4';

    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';
    const member = await memberSerivce.createMember(uuid);

    await service.createContent(title, link, category, member.userId);
    await service.createContent(title, link2, category, member.userId);
    await service.createContent(title, link3, category, member.userId);
    await expect(service.createContent(title, link4, category, member.userId)).rejects.toThrow(
      new HttpException({ errMsg: 'Upload limit of three contents reached for today' }, HttpStatus.BAD_REQUEST),
    );
  });

  it('upload not duplicate content', async () => {
    const title = 'developer roadmap';
    const category = 'youtube';
    const link = 'https://youtube.com';
    const link2 = 'https://youtube.com';

    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';
    const member = await memberSerivce.createMember(uuid);

    await service.createContent(title, link, category, member.userId);
    await expect(service.createContent(title, link2, category, member.userId)).rejects.toThrow(
      new HttpException(
        { errMsg: 'Content with the same link has already been uploaded today' },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('get content by id', async () => {
    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';
    const member = await memberSerivce.createMember(uuid);

    const content = await repository.save(
      Content.from({
        link: 'https://youtube.com',
        category: 'youtube',
        title: 'developer roadmap',
        createdAt: new Date(),
        updatedAt: new Date(),
        member: member,
      }),
    );
    const getContent = await service.getContentById(1);
    expect(getContent.id).toEqual(content.id);
    expect(getContent.link).toEqual(content.link);
    expect(getContent.title).toEqual(content.title);
    expect(getContent.category).toEqual(content.category);
  });

  it('update content', async () => {
    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';
    const member = await memberSerivce.createMember(uuid);

    await repository.save(
      Content.from({
        link: 'https://youtube.com',
        category: 'youtube',
        title: 'developer roadmap',
        createdAt: new Date(),
        updatedAt: new Date(),
        member: member,
      }),
    );

    const updateLink = 'https://x.com';
    const updateCategory = 'twitter';
    const updateTitle = 'software engineer';
    const updatedContent = await service.updateContent(1, updateTitle, updateLink, updateCategory);

    const findUpdatedContent = await repository.findOne({ where: { id: 1 } });
    expect(findUpdatedContent.id).toEqual(updatedContent.id);
    expect(findUpdatedContent.link).toEqual(updateLink);
    expect(findUpdatedContent.title).toEqual(updateTitle);
    expect(findUpdatedContent.category).toEqual(updateCategory);
  });

  it('delete content', async () => {
    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';
    const member = await memberSerivce.createMember(uuid);

    await repository.save(
      Content.from({
        link: 'https://youtube.com',
        category: 'youtube',
        title: 'developer roadmap',
        createdAt: new Date(),
        updatedAt: new Date(),
        member: member,
      }),
    );

    const deleteResult = await service.deleteContent(1);
    expect(deleteResult.affected).toEqual(1);
    const content = await repository.findOne({ where: { id: 1 } });
    expect(content).toBeNull();
  });
});
