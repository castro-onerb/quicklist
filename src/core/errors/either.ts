class Left<L, R> {
  private readonly _value: L;

  get value(): L {
    return this._value;
  }

  constructor(value: L) {
    this._value = value;
  }

  left(): this is Left<L, R> {
    return true;
  }

  right(): this is Right<L, R> {
    return false;
  }
}

class Right<L, R> {
  private readonly _value: R;

  get value(): R {
    return this._value;
  }

  constructor(value: R) {
    this._value = value;
  }

  left(): this is Left<L, R> {
    return false;
  }

  right(): this is Right<L, R> {
    return true;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export function left<L, R>(value: L): Left<L, R> {
  return new Left(value);
}

export function right<L, R>(value: R): Right<L, R> {
  return new Right(value);
}
