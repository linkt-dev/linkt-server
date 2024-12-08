import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;

  @ApiProperty({
    type: 'string',
  })
  userId: string;

  static from(accessToken: string, userId: string): LoginResponseDto {
    const responseDto = new LoginResponseDto();
    responseDto.accessToken = accessToken;
    responseDto.userId = userId;
    return responseDto;
  }
}
