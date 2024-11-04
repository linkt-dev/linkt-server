import { Member } from '../member.entity';

export class MemberResponseDto {
  id: number;

  userId: string;

  createdAt: Date;

  updatedAt: Date;

  static from(entity: Member) {
    const response = new MemberResponseDto();
    response.id = entity.id;
    response.userId = entity.userId;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    return response;
  }
}
