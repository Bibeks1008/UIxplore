import { Module } from '@nestjs/common';
import { WebsiteModule } from './website/website.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PageModule } from './page/page.module';
import { ElementModule } from './element/element.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    WebsiteModule,
    CategoryModule,
    PageModule,
    ElementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
