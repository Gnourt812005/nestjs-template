import { Command } from '@nestjs/cqrs';
import { ExampleCreateDto } from './example-create.dto';

export class ExampleCreateCommand extends Command<any> {
  constructor(public readonly input: ExampleCreateDto) {
    super();
  }
}
