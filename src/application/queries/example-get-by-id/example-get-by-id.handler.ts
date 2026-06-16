import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExampleGetByIdQuery } from './example-get-by-id.query';

@QueryHandler(ExampleGetByIdQuery)
export class ExampleGetByIdQueryHandler implements IQueryHandler<ExampleGetByIdQuery, any> {
  async execute(query: ExampleGetByIdQuery): Promise<any> {
    // TODO: implement query handling
    return {};
  }
}
