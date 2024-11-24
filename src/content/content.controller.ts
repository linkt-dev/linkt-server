import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentCreateRequestDto } from './dto/content-create-request.dto';
import { ContentResponseDto } from './dto/content-response.dto';
import { ContentUpdateRequestDto } from './dto/content-update-request.dto';
import { CommonResponseDto } from '../common/common-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(AuthGuard('accessToken'))
  async createContent(@Body() req: ContentCreateRequestDto) {
    const content = await this.contentService.createContent(req.title, req.link, req.category, req.userId);
    return ContentResponseDto.from(content);
  }

  @Get(':id')
  @UseGuards(AuthGuard('accessToken'))
  async getContent(@Param('id') id: number) {
    const content = await this.contentService.getContentById(id);
    return ContentResponseDto.from(content);
  }

  @Patch(':id')
  async updateContent(@Param('id') id: number, @Body() req: ContentUpdateRequestDto) {
    const updatedContent = await this.contentService.updateContent(id, req.title, req.link, req.category);
    return ContentResponseDto.from(updatedContent);
  }

  @Delete(':id')
  async deleteContent(@Param('id') id: number) {
    const deleteResult = await this.contentService.deleteContent(id);
    if (deleteResult.affected && deleteResult.affected > 0) {
      return CommonResponseDto.from('successfully deleted content');
    }
  }
}
