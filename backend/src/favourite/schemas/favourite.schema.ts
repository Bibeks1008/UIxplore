import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Favourite {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website',
    required: true,
  })
  website: string;
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
