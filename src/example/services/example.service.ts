import { Injectable } from '@nestjs/common';
import { InternalExampleReaderService } from './internal/example-reader.service';
import { InternalExampleWriterService } from './internal/example-writer.service';

@Injectable()
export class ExampleService {
  constructor(
    private readonly reader: InternalExampleReaderService,
    private readonly writer: InternalExampleWriterService,
  ) {}

  async findAll() {
    return this.reader.findAll();
  }

  async findById(id: string) {
    return this.reader.findById(id);
  }

  async create(data: any) {
    return this.writer.create(data);
  }

  async update(id: string, data: any) {
    return this.writer.update(id, data);
  }

  async delete(id: string) {
    return this.writer.delete(id);
  }
}