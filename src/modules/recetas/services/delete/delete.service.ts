import { Inject, Injectable } from '@nestjs/common';
import {
  RECETA_REPOSITORY,
  RecetaRepository,
} from '../../repository/receta-repository';
import { RecetaDelete } from './types/typesDelete';

@Injectable()
export class RecetaMedicaDeleteService implements RecetaDelete {
  constructor(
    @Inject(RECETA_REPOSITORY)
    private readonly recetaRepository: RecetaRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.recetaRepository.delete(id);
  }
}
