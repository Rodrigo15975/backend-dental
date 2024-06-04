import { Inject, Injectable } from '@nestjs/common';
import { DetallesDelete } from './types/typesDelete';
import {
  DETALLE_REPOSITORY,
  DetalleRepository,
} from '../../repository/detalle-repositor';

@Injectable()
export class DetallesDeleteService implements DetallesDelete {
  constructor(
    @Inject(DETALLE_REPOSITORY)
    private readonly detalleRepository: DetalleRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.detalleRepository.delete(id);
  }
}
