import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, WebsiteSchema } from './schemas';
import { Page, PageSchema } from 'src/page/schemas';
import { Category, CategorySchema } from 'src/category/schemas';
import { Element, ElementSchema } from 'src/element/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Website.name, schema: WebsiteSchema },
      { name: Page.name, schema: PageSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Element.name, schema: ElementSchema },
    ]),
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
