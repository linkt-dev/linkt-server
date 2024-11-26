import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentCreateRequestDto } from './dto/content-create-request.dto';
import { ContentResponseDto } from './dto/content-response.dto';
import { ContentUpdateRequestDto } from './dto/content-update-request.dto';
import { CommonResponseDto } from '../common/common-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtRequest } from '../auth/types/jwt-request.interface';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(AuthGuard('accessToken'))
  async createContent(@Body() req: ContentCreateRequestDto, @Req() jwtRequest: JwtRequest) {
    const content = await this.contentService.createContent(req.category, req.link, jwtRequest.user.userId, req.title);
    return ContentResponseDto.from(content);
  }

  @Get(':id')
  @UseGuards(AuthGuard('accessToken'))
  async getContent(@Param('id') id: number) {
    const content = await this.contentService.getContentById(id);
    return ContentResponseDto.from(content);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('accessToken'))
  async updateContent(@Param('id') id: number, @Body() req: ContentUpdateRequestDto) {
    const updatedContent = await this.contentService.updateContent(id, req.title, req.link, req.category);
    return ContentResponseDto.from(updatedContent);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('accessToken'))
  async deleteContent(@Param('id') id: number) {
    const deleteResult = await this.contentService.deleteContent(id);
    if (deleteResult.affected && deleteResult.affected > 0) {
      return CommonResponseDto.from('successfully deleted content');
    }
  }
}
