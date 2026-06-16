import { Nullable } from '@core/types';
import { BaseAggregateRoot } from './base.aggregate-root';

/**
 * Base Repository Interface.
 * Enforces the rule that Repositories must strictly save and return Aggregate Roots,
 * never internal child Entities.
 */
export interface IBaseRepository<Aggregate extends BaseAggregateRoot<unknown>> {
  /**
   * Retrieves an aggregate root by its unique ID.
   */
  findById(id: string): Promise<Nullable<Aggregate>>;

  /**
   * Saves (inserts or updates) an aggregate root.
   * If using a Unit of Work, this method might optionally accept a transaction/session context,
   * though that is often abstracted behind the UoW implementation.
   */
  save(aggregate: Aggregate): Promise<void>;

  /**
   * Saves multiple aggregate roots.
   */
  saveMany(aggregates: Aggregate[]): Promise<void>;

  /**
   * Deletes an aggregate root by its ID.
   */
  delete(id: string): Promise<void>;
}
