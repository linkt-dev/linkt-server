import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    type: 'string',
  })
  userId: string;

  static from(userId: string): LoginResponseDto {
    const responseDto = new LoginResponseDto();
    responseDto.userId = userId;
    return responseDto;
  }
}
