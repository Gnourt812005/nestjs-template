import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({
  collection: 'examples',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ExampleModel {

  created_at: Date;
  updated_at: Date;
}

export type ExampleDocument = HydratedDocument<ExampleModel>;
export const ExampleSchema = SchemaFactory.createForClass(ExampleModel);

