import { BaseValueObject } from '@core/common/base.value-object';

export interface ExampleProps {
  value: string;
}

export class ExampleVO extends BaseValueObject<ExampleProps> {
  private constructor(props: ExampleProps) {
    super(props);
  }

  public static create(props: ExampleProps): ExampleVO {
    return new ExampleVO(props);
  }

  get value(): string {
    return this.props.value;
  }
}
