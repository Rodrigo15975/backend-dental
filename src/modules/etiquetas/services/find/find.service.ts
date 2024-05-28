import { Inject, Injectable } from '@nestjs/common';
import {
  ETIQUETA_REPOSITORY,
  EtiquetaRepository,
} from '../../repository/etiqueta-repository';
import { EtiquetaFind } from './types/typeFind';
import { Etiqueta } from '../../entities/etiqueta.entity';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class EtiquetaFindService implements EtiquetaFind {
  constructor(
    @Inject(ETIQUETA_REPOSITORY)
    private readonly etiquetaRepository: EtiquetaRepository,
    private readonly hanledErrors: HandleErrors,
  ) {}

  async findById(id: string): Promise<Etiqueta> {
    const etiqueta = await this.etiquetaRepository.findById(id);
    if (!etiqueta)
      this.hanledErrors.handleErrorsNotFoundException(
        `ID ${id}, etiqueta no existe `,
      );
    return etiqueta;
  }

  async findAll(): Promise<Etiqueta[]> {
    return await this.etiquetaRepository.findAll();
  }
}
