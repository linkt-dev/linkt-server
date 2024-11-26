export class LoginResponseDto {
  accessToken: string;

  static from(accessToken: string) {
    const responseDto = new LoginResponseDto();
    responseDto.accessToken = accessToken;
    return responseDto;
  }
}
