import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Element, ElementSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Element.name, schema: ElementSchema }]),
  ],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
