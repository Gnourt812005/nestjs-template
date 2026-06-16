import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example, ExampleDocument } from '../../schemas/example.schema';

@Injectable()
export class InternalExampleWriterService {
  constructor(
    @InjectModel(Example.name) private readonly model: Model<ExampleDocument>,
  ) {}

  async create(data: any) {
    return this.model.create(data);
  }

  async update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}