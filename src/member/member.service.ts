import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import baseX from 'base-x';

const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base62 = baseX(BASE62_ALPHABET);

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async createMember(uuid: string) {
    const member = await this.memberRepository.save(Member.from({ userId: '' }));

    member.userId = base62.encode(Buffer.from(uuid));

    return await this.memberRepository.save(member);
  }

  async getMemberByUserId(userId: string) {
    return await this.memberRepository.findOne({
      where: {
        userId: userId,
      },
    });
  }
}
