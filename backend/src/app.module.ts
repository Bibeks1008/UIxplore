import { Module } from '@nestjs/common';
import { WebsiteModule } from './website/website.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot() ,WebsiteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
