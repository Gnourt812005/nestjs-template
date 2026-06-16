/**
 * Base Value Object.
 * Value objects do not have an identity (id).
 * They are defined entirely by their attributes (props) and are immutable.
 */
export abstract class BaseValueObject<Props> {
  public readonly props: Props;

  constructor(props: Props) {
    // Freeze the props to ensure immutability
    this.props = Object.freeze(props);
  }

  /**
   * Value Objects are compared by their properties, not by reference.
   */
  public equals(vo?: BaseValueObject<Props>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    // Deep equality check constraint (simplistic serialization)
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
