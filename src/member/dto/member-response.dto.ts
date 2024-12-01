import { Member } from '../member.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MemberResponseDto {
  @ApiProperty({
    type: 'number',
  })
  id: number;

  @ApiProperty({
    type: 'string',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
  })
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
