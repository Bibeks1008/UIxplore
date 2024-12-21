import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Website } from 'src/website/schemas';

@Schema({ timestamps: true })
export class Page {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website',
    required: true,
  })
  website: Website;

  @Prop({ required: true })
  page: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  imageId: string;

  @Prop({ required: true })
  description: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
