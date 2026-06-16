export abstract class BaseEntity<Props> {
  protected _id?: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this._id = id;
    this.props = props;
  }

  get id(): string | undefined {
    return this._id;
  }

  public setId(id: string): void {
    if (this._id) {
      throw new Error('ID is already set');
    }
    this._id = id;
  }

  public equals(object?: BaseEntity<Props>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof BaseEntity)) {
      return false;
    }

    return this._id === object.id;
  }
}
