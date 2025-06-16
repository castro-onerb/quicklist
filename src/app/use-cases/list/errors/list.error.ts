import { AppError } from '@/core/errors/app.error';

export class ListAlreadyExistsError extends AppError {
  readonly code = 'list-service.already-exists';

  constructor() {
    super('Já existe uma lista com esse nome.');
  }
}

export class ListNotFoundError extends AppError {
  readonly code = 'list-service.not-exists';

  constructor() {
    super('Não encontramos a lista solicitada.');
  }
}
