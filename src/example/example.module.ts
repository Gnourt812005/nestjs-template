import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/example.service';
import { InternalExampleReaderService } from './services/internal/example-reader.service';
import { InternalExampleWriterService } from './services/internal/example-writer.service';
import { Example, ExampleSchema } from './schemas/example.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    InternalExampleReaderService,
    InternalExampleWriterService,
  ],
  exports: [ExampleService], // Only the facade is exported
})
export class ExampleModule {}