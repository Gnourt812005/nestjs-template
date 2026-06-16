import { Query } from '@nestjs/cqrs';
import { ExampleGetByIdDto } from './example-get-by-id.dto';

export class ExampleGetByIdQuery extends Query<any> {
  constructor(public readonly input: ExampleGetByIdDto) {
    super();
  }
}
