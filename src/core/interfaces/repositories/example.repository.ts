import { IBaseRepository } from '@core/common/base.repository.interface';
import { ExampleRoot } from '@core/aggregate-roots/example.aggregate';

export interface IExampleRepository extends IBaseRepository<ExampleRoot> {
  // TODO: define CRUD methods
}

export const EXAMPLE_REPOSITORY = Symbol('Example_REPOSITORY');
