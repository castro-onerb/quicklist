export abstract class ListRepository {
  abstract save({ name }: { name: string }): Promise<void>;
}
