import { BaseAggregateRoot } from '@core/common/base.aggregate-root';

export interface ExampleProps {
  createdAt: Date;
  updatedAt: Date;
}

export type ExampleCreateProps = Omit<ExampleProps, 'createdAt' | 'updatedAt'>;

export class ExampleRoot extends BaseAggregateRoot<ExampleProps> {
  private constructor(props: ExampleProps, id?: string) {
    super(props, id);
  }

  public static create(props: ExampleCreateProps): ExampleRoot {
    const now = new Date();
    return new ExampleRoot({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static instantiate(id: string, props: ExampleProps): ExampleRoot {
    return new ExampleRoot(props, id);
  }

}
