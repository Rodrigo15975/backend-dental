import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateApoderadoDto } from '../../dto/update-apoderado.dto';
import {
  APODERADO_REPOSITORY,
  ApoderadoRepository,
} from '../../repository/apoderado-repository';
import { ApoderadoUpdate } from './types/typesUpdate';

@Injectable()
export class ApoderadoUpdateService implements ApoderadoUpdate {
  constructor(
    @Inject(APODERADO_REPOSITORY)
    private readonly apoderadoRepository: ApoderadoRepository,
    private readonly handledErrors: HandleErrors,
  ) {}

  async update(data: UpdateApoderadoDto): Promise<void> {
    const { _id } = data;

    await this.apoderadoRepository.update(data, _id);
    this.handledErrors.handleSendMessage('Apoderado actualizado correctamente');
  }
}
