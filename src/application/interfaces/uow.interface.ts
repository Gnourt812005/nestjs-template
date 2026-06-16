export interface IUnitOfWork {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  execute<T>(operation: () => Promise<T>): Promise<T>;
}

export const UNIT_OF_WORK = Symbol('IUnitOfWork');
