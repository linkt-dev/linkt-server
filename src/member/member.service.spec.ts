import { MemberService } from './member.service';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../content/content.entity';

describe('MemberService', () => {
  let service: MemberService;
  let repository: Repository<Member>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Member, Content],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Member, Content]),
      ],
      providers: [MemberService],
    }).compile();

    service = module.get(MemberService);
    repository = module.get<Repository<Member>>(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a member', async () => {
    const uuid = '7268533c-ba63-4d8b-a57d-d365040dbfe4';

    const createdMember = await service.createMember(uuid);
    const getMember = await repository.findOne({ where: { id: createdMember.id } });
    expect(getMember.id).toEqual(createdMember.id);
    expect(getMember.userId).toEqual(createdMember.userId);
  });

  it('update a member', async () => {
    const member = await repository.save(
      Member.from({
        userId: 'zMQktZI7jSV8lItyo9loU1Jp0UKwJunwwoV0yH7EIvtX89vI',
        expoPushToken: 'expoPushToken',
      }),
    );

    const updatedMember = await service.updateMember(member.id, 'newExpoPushToken');
    expect(updatedMember.expoPushToken).toEqual('newExpoPushToken');
  });

  it('get member by userId', async () => {
    const member = await repository.save(
      Member.from({
        userId: 'zMQktZI7jSV8lItyo9loU1Jp0UKwJunwwoV0yH7EIvtX89vI',
        expoPushToken: 'expoPushToken',
      }),
    );

    const getMember = await service.getMemberByUserId('zMQktZI7jSV8lItyo9loU1Jp0UKwJunwwoV0yH7EIvtX89vI');
    expect(getMember.id).toEqual(member.id);
    expect(getMember.userId).toEqual(member.userId);
    expect(getMember.expoPushToken).toEqual(member.expoPushToken);
  });
});
