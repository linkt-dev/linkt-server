import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateRequestDto } from './dto/member-create-request.dto';
import { MemberResponseDto } from './dto/member-response.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async createMember(@Body() req: MemberCreateRequestDto) {
    const member = await this.memberService.createMember(req.userId);
    return MemberResponseDto.from(member);
  }

  @Get(':userId')
  async getMember(@Param('userId') userId: string) {
    const member = await this.memberService.getMemberByUserId(userId);
    return MemberResponseDto.from(member);
  }
}
