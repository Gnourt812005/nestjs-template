import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ClientSession } from 'mongoose';
import { IUnitOfWork } from '@/application/interfaces';
import { Nullable } from '@/core/types';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class MongoUnitOfWork implements IUnitOfWork {
  private readonly als = new AsyncLocalStorage<ClientSession>();

  constructor(@InjectConnection() private readonly connection: Connection) { }

  /**
   * Starts a transaction and runs the operation within an AsyncLocalStorage context.
   * Supports nested calls by reusing the existing session if one is already active.
   */
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    const existingSession = this.als.getStore();

    if (existingSession) {
      // Nested execution: reuse the current transaction session
      return operation();
    }

    // Root execution: start a new session and transaction
    const session = await this.connection.startSession();
    session.startTransaction();

    return this.als.run(session, async () => {
      try {
        const result = await operation();
        await session.commitTransaction();
        return result;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    });
  }

  /**
   * Retrieves the current session from AsyncLocalStorage.
   * Repositories call this to participate in the active transaction.
   */
  getSession(): Nullable<ClientSession> {
    return this.als.getStore() || null;
  }

  /**
   * Manual transaction management (deprecated in favor of execute())
   * These remain for interface compatibility but startTransaction() 
   * should ideally not be used directly with ALS in this pattern.
   */
  async startTransaction(): Promise<void> {
    throw new Error('Use execute() instead for AsyncLocalStorage-based transactions');
  }

  async commitTransaction(): Promise<void> {
    throw new Error('Use execute() instead for AsyncLocalStorage-based transactions');
  }

  async rollbackTransaction(): Promise<void> {
    throw new Error('Use execute() instead for AsyncLocalStorage-based transactions');
  }
}
