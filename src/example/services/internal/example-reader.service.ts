import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example, ExampleDocument } from '../../schemas/example.schema';

@Injectable()
export class InternalExampleReaderService {
  constructor(
    @InjectModel(Example.name) private readonly model: Model<ExampleDocument>,
  ) {}

  async findAll() {
    return this.model.find().exec();
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }
}