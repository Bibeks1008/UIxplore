import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/category/schemas';

@Schema({
  timestamps: true,
})
export class Website {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  fonts: string;

  @Prop({
    required: true,
  })
  colors: string;
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);
