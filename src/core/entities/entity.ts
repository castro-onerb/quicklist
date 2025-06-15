import { UniqueID } from '../value-objects/unique-id.vo';

export abstract class Entity<Props> {
  private readonly _id: UniqueID;
  protected readonly _props: Props;

  get id(): UniqueID {
    return this._id;
  }

  constructor(props: Props, id?: UniqueID) {
    this._id = id ?? new UniqueID();
    this._props = props;
  }
}
