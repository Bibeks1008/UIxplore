import { Controller, Get } from '@nestjs/common';
import { ElementService } from './element.service';

@Controller('elementScreenshot')
export class ElementController {
  constructor(private elementService: ElementService) {}

  @Get()
  getAllElementScreenshots() {
    return this.elementService.getAllElementScreenshots();
  }
}
