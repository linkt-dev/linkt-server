import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateRequestDto } from './dto/member-create-request.dto';
import { MemberResponseDto } from './dto/member-response.dto';
import { ApiCreatedResponse, ApiExcludeEndpoint, ApiResponse } from '@nestjs/swagger';
import { MemberUpdateRequestDto } from './dto/member-update-request.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiCreatedResponse({
    type: MemberResponseDto,
  })
  async createMember(@Body() req: MemberCreateRequestDto) {
    const member = await this.memberService.createMember(req.uuid, req.expoPushToken);
    return MemberResponseDto.from(member);
  }

  @Patch(':id')
  @ApiResponse({
    type: MemberResponseDto,
  })
  async updateMember(@Param('id') id: number, @Body() req: MemberUpdateRequestDto) {
    const member = await this.memberService.updateMember(id, req.expoPushToken);
    if ('errMsg' in member) {
      throw new BadRequestException(member.errMsg);
    }
    return MemberResponseDto.from(member);
  }

  @Get(':userId')
  @ApiExcludeEndpoint()
  async getMember(@Param('userId') userId: string) {
    const member = await this.memberService.getMemberByUserId(userId);
    return MemberResponseDto.from(member);
  }
}
