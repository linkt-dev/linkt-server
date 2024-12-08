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

  static from(accessToken: string) {
    const responseDto = new LoginResponseDto();
    responseDto.accessToken = accessToken;
    return responseDto;
  }
}
