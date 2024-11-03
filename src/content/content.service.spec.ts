import { ContentService } from './content.service';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

describe('ContentService', () => {
  let service: ContentService;
  let repository: Repository<Content>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Content],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Content]),
      ],
      providers: [ContentService],
    }).compile();

    service = module.get<ContentService>(ContentService);
    repository = module.get<Repository<Content>>(getRepositoryToken(Content));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create content', async () => {
    const title = 'developer roadmap';
    const category = 'youtube';
    const link = 'https://youtube.com';

    const createdContent = await service.createContent(title, category, link);
    const getContent = await repository.findOne({ where: { id: createdContent.id } });
    expect(getContent.id).toEqual(createdContent.id);
    expect(getContent.link).toEqual(createdContent.link);
    expect(getContent.title).toEqual(createdContent.title);
    expect(getContent.category).toEqual(createdContent.category);
  });

  it('get content by id', async () => {
    const content = await repository.save(
      Content.from({
        link: 'https://youtube.com',
        category: 'youtube',
        title: 'developer roadmap',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    const getContent = await service.getContentById(1);
    expect(getContent.id).toEqual(content.id);
    expect(getContent.link).toEqual(content.link);
    expect(getContent.title).toEqual(content.title);
    expect(getContent.category).toEqual(content.category);
  });

  it('update content', async () => {
    await repository.save(
      Content.from({
        link: 'https://youtube.com',
        category: 'youtube',
        title: 'developer roadmap',
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await repository.save(
      Content.from({
        link: 'https://youtube.com',
        category: 'youtube',
        title: 'developer roadmap',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const deleteResult = await service.deleteContent(1);
    expect(deleteResult.affected).toEqual(1);
    const content = await repository.findOne({ where: { id: 1 } });
    expect(content).toBeNull();
  });
});
