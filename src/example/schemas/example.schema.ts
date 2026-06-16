import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'examples',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Example {
  // Define fields here
  // @Prop({ required: true })
  // name: string;

  created_at: Date;
  updated_at: Date;
}

export type ExampleDocument = HydratedDocument<Example>;
export const ExampleSchema = SchemaFactory.createForClass(Example);