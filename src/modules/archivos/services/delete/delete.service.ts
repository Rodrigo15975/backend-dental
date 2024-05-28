import { Inject, Injectable } from '@nestjs/common';
import { ArchivoDelete } from './types/typesDelete';
import {
  ARCHIVO_REPOSITORY,
  ArchivoRepository,
} from '../../repository/archivo-repository';

@Injectable()
export class ArchivoDeleteService implements ArchivoDelete {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository,
  ) {}
  async delete(id: string): Promise<void> {
    await this.archivoRepository.delete(id);
  }
}
