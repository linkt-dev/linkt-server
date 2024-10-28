export class CommonResponseDto {
  message: string;

  static from(message: string) {
    const commonResponseDto = new CommonResponseDto();
    commonResponseDto.message = message;
    return commonResponseDto;
  }
}
