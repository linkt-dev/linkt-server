import { Member } from '../../member/member.entity';

export class ContentCreateVo {
  title: string;

  link: string;

  category: string;

  createdAt: Date;

  updatedAt: Date;

  member: Member;
}
