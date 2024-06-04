import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { AlergiasDeleteService } from 'src/modules/alergias/services/delete/delete.service';
import { ApoderadoDeleteService } from 'src/modules/apoderado/services/delete/delete.service';
import { ArchivoDeleteService } from 'src/modules/archivos/services/delete/delete.service';
import { ArchivoFileService } from 'src/modules/archivos/services/file/file.service';
import { HistorialClinicaDeleteService } from 'src/modules/historial-clinica/services/delete/delete.service';
import { NotasDeleteService } from 'src/modules/nota/services/delete/delete.service';
import { PrescripcionesDeleteService } from 'src/modules/prescripciones/services/delete/delete.service';
import { RecetaMedicaDeleteService } from 'src/modules/recetas/services/delete/delete.service';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { PacienteFindService } from '../find/find.service';
import { PacienteDelete } from './types/typesDelete';

@Injectable()
export class PacienteDeleteService implements PacienteDelete {
  constructor(
    @Inject(PACIENTE_REPOSITORY)
    private readonly pacienteRepository: PacienteRepository,
    private readonly pacienteFindService: PacienteFindService,

    private readonly handledErrors: HandleErrors,
    private readonly apoderadoDeleteServices: ApoderadoDeleteService,
    private readonly historialClinicaDeleteServices: HistorialClinicaDeleteService,

    private readonly archivoFileService: ArchivoFileService,
    private readonly archivoDeleteService: ArchivoDeleteService,

    private readonly alergiaDeleteService: AlergiasDeleteService,
    private readonly notaDeleteService: NotasDeleteService,

    private readonly prescripcionesDeleteService: PrescripcionesDeleteService,
    private readonly recetaMedica: RecetaMedicaDeleteService,
  ) {}
  // mayor de edad
  async delete(id: string): Promise<void> {
    const paciente = await this.pacienteFindService.findById(id);

    for (const historialClinico of paciente.historialClinico) {
      await this.deleteAllHistorialClinica(historialClinico._id);
    }
    for (const archivos of paciente.archivos) {
      await this.deleteAllArchivos(archivos._id);
      await this.deleteAllFiles(archivos.id_url_archivo, archivos.url_archivo);
    }
    for (const receta of paciente.recetaMedica) {
      await this.deleteRecetas(receta._id);
    }

    for (const prescripciones of paciente.prescripciones) {
      await this.deletePrescripciones(prescripciones._id);
    }
    await this.deleteAlergia(paciente.alergia._id);
    await this.deleteNota(paciente.nota._id);
    await this.pacienteRepository.delete(id);
    this.handledErrors.handleSendMessage('Paciente eliminado correctamente');
  }

  // Por que solamente el menor de edad tiene apoderado
  async deletePacienteMenor(id: string): Promise<void> {
    const pacienteMenor = await this.pacienteFindService.findById(id);

    for (const apoderado of pacienteMenor.apoderado) {
      await this.deleteAllApoderados(apoderado._id);
    }

    for (const historialClinico of pacienteMenor.historialClinico) {
      await this.deleteAllHistorialClinica(historialClinico._id);
    }

    for (const receta of pacienteMenor.recetaMedica) {
      await this.deleteRecetas(receta._id);
    }

    for (const prescripciones of pacienteMenor.prescripciones) {
      await this.deletePrescripciones(prescripciones._id);
    }
    for (const archivos of pacienteMenor.archivos) {
      await this.deleteAllArchivos(archivos._id);
      await this.deleteAllFiles(archivos.id_url_archivo, archivos.url_archivo);
    }

    await this.deleteAlergia(pacienteMenor.alergia._id);

    await this.deleteNota(pacienteMenor.nota._id);
    await this.pacienteRepository.delete(id);
    this.handledErrors.handleSendMessage('Paciente eliminado correctamente');
  }

  private async deleteAlergia(id: string) {
    await this.alergiaDeleteService.delete(id);
  }
  private async deleteNota(id: string) {
    await this.notaDeleteService.delete(id);
  }
  private async deleteAllArchivos(id: string) {
    await this.archivoDeleteService.delete(id);
  }
  private async deleteAllFiles(id: string, url: string) {
    await this.archivoFileService.removeFile(id, url);
  }
  private async deletePrescripciones(id: string) {
    await this.prescripcionesDeleteService.delete(id);
  }
  private async deleteRecetas(id: string) {
    await this.recetaMedica.delete(id);
  }

  private async deleteAllHistorialClinica(id: string) {
    await this.historialClinicaDeleteServices.delete(id);
  }
  private async deleteAllApoderados(id: string) {
    await this.apoderadoDeleteServices.deleteAllApoderados(id);
  }
}
