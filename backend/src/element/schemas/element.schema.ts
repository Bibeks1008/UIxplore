import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Website } from 'src/website/schemas';

@Schema({ timestamps: true })
export class Element {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website',
    required: true,
  })
  website: Website;

  @Prop({ required: true })
  element: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  imageId: string;
}

export const ElementSchema = SchemaFactory.createForClass(Element);
