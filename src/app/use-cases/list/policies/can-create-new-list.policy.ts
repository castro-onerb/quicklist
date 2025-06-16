import { ListRepository } from '@/app/repositories/list.repository';

export class CanCreateNewListPolicy {
  constructor(private readonly useRepo: ListRepository) {}

  async execute({ name }: { name: string }) {
    const list = await this.useRepo.findByName(name);
    return !list;
  }
}
