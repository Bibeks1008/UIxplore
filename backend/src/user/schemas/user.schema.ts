import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  verificationCode: string;

  @Prop()
  isVerified: boolean;

  @Prop()
  sessionExpiresAt: Date;

  @Prop()
  codeExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
