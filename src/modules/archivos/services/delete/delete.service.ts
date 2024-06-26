import { Inject, Injectable } from '@nestjs/common';
import { ArchivoDelete } from './types/typesDelete';
import {
  ARCHIVO_REPOSITORY,
  ArchivoRepository,
} from '../../repository/archivo-repository';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { Types } from 'mongoose';
import { ArchivoFileService } from '../file/file.service';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { Archivo } from '../../entities/archivo.entity';

@Injectable()
export class ArchivoDeleteService implements ArchivoDelete {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository,
    private readonly archivofile: ArchivoFileService,
    private readonly handledErrors: HandleErrors,
    private readonly pacienteFindService: PacienteFindService,
  ) {}

  async deleteArchivoOnePaciente(
    idDoc: string,
    idPaciente: string,
  ): Promise<void> {
    const archivo = await this.findById(idDoc);

    await this.removeFile(archivo.url_archivo, archivo.id_url_archivo);

    const paciente = await this.pacienteFindService.verifyId(idPaciente);
    await paciente.updateOne({
      $pull: {
        archivos: new Types.ObjectId(idDoc),
      },
    });
    await this.archivoRepository.delete(idDoc);
    this.handledErrors.handleSendMessage('Archivo eliminado');
  }
  private async removeFile(url_archivo: string, id_url_archivo: string) {
    return await this.archivofile.removeFile(id_url_archivo, url_archivo);
  }

  private async findById(id: string): Promise<Archivo> {
    const archivo = await this.archivoRepository.findById(id);
    if (!archivo)
      this.handledErrors.handleErrorsNotFoundException(
        `Id del archivo ${id} no fue encontrado`,
      );
    return archivo;
  }
  async delete(id: string): Promise<void> {
    await this.archivoRepository.delete(id);
  }
}
