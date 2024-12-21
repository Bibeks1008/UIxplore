import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WebsiteService } from './website.service';
import { AddWebsiteDto } from './dto/addWebsite.dto';

@Controller('website')
export class WebsiteController {
  constructor(private websiteService: WebsiteService) {}

  @Get()
  getAllWebsites() {
    return this.websiteService.getAllWebsites();
  }

  @Get(':websiteId')
  getOneWebsite(@Param('websiteId') websiteId: string) {
    return this.websiteService.getOneWebsite(websiteId);
  }

  @Post()
  postOneWebsite(@Body() dto: AddWebsiteDto) {
    this.websiteService.addOneWebsite(dto);
  }
}
