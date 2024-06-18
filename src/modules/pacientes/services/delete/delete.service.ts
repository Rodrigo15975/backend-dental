import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { AlergiasDeleteService } from 'src/modules/alergias/services/delete/delete.service';
import { ApoderadoDeleteService } from 'src/modules/apoderado/services/delete/delete.service';
import { ArchivoDeleteService } from 'src/modules/archivos/services/delete/delete.service';
import { ArchivoFileService } from 'src/modules/archivos/services/file/file.service';
import { DetallesServicioDeleteService } from 'src/modules/detalles-servicios/services/delete/delete.service';
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
import { DetallesDeleteService } from 'src/modules/detalles/services/delete/delete.service';
import { CitaDeleteService } from 'src/modules/citas/services/delete/delete.service';

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

    private readonly detallesServiciosDelete: DetallesServicioDeleteService,
    private readonly detallesDelete: DetallesDeleteService,

    private readonly citaServiceDelete: CitaDeleteService,
  ) {}
  // mayor de edad
  async delete(id: string): Promise<void> {
    const paciente = await this.pacienteFindService.findById(id);

    console.log(paciente);

    return;
    const deleteDetalles = paciente.detalles.map((detalles) =>
      this.deleteDetalles(detalles._id),
    );
    const deleteDetallesServicios = paciente.detallesServicios.map(
      (detallesServicios) =>
        this.deleteDetallesServicios(detallesServicios._id),
    );

    const deleteHistorialClinico = paciente.historialClinico.map(
      (historialClinico) =>
        this.deleteAllHistorialClinica(historialClinico._id),
    );

    const deleteRecetas = paciente.recetaMedica.map((receta) =>
      this.deleteRecetas(receta._id),
    );

    const deletePrescripciones = paciente.prescripciones.map((prescripciones) =>
      this.deletePrescripciones(prescripciones._id),
    );

    const deleteArchivos = paciente.archivos.map(async (archivos) => {
      await this.deleteAllArchivos(archivos._id);
      await this.deleteAllFiles(archivos.id_url_archivo, archivos.url_archivo);
    });

    const citas = paciente.citas.map((cita) => this.deleteCitas(cita._id));

    await Promise.all([
      ...deleteDetallesServicios,
      ...deleteDetalles,
      ...deleteHistorialClinico,
      ...deleteRecetas,
      ...deletePrescripciones,
      ...deleteArchivos,
      ...citas,
      this.deleteAlergia(paciente.alergia._id),
      this.deleteNota(paciente.nota._id),
    ]);

    await this.pacienteRepository.delete(id);
    this.handledErrors.handleSendMessage('Paciente eliminado correctamente');
  }

  // Por que solamente el menor de edad tiene apoderado
  async deletePacienteMenor(id: string): Promise<void> {
    const pacienteMenor = await this.pacienteFindService.findById(id);

    const deleteDetalles = pacienteMenor.detalles.map((detalles) =>
      this.deleteDetalles(detalles._id),
    );
    const deleteDetallesServicios = pacienteMenor.detallesServicios.map(
      (detallesServicios) =>
        this.deleteDetallesServicios(detallesServicios._id),
    );

    const deleteApoderados = pacienteMenor.apoderado.map((apoderado) =>
      this.deleteAllApoderados(apoderado._id),
    );

    const deleteHistorialClinico = pacienteMenor.historialClinico.map(
      (historialClinico) =>
        this.deleteAllHistorialClinica(historialClinico._id),
    );

    const deleteRecetas = pacienteMenor.recetaMedica.map((receta) =>
      this.deleteRecetas(receta._id),
    );

    const deletePrescripciones = pacienteMenor.prescripciones.map(
      (prescripciones) => this.deletePrescripciones(prescripciones._id),
    );

    const deleteArchivos = pacienteMenor.archivos.map(async (archivos) => {
      await this.deleteAllArchivos(archivos._id);
      await this.deleteAllFiles(archivos.id_url_archivo, archivos.url_archivo);
    });

    const citas = pacienteMenor.citas.map((cita) => this.deleteCitas(cita._id));

    await Promise.all([
      ...deleteDetalles,
      ...deleteDetallesServicios,
      ...deleteApoderados,
      ...deleteHistorialClinico,
      ...deleteRecetas,
      ...deletePrescripciones,
      ...deleteArchivos,
      ...citas,
      this.deleteAlergia(pacienteMenor.alergia._id),
      this.deleteNota(pacienteMenor.nota._id),
    ]);

    await this.pacienteRepository.delete(id);
    this.handledErrors.handleSendMessage('Paciente eliminado correctamente');
  }
  // De los servicios
  private async deleteDetalles(id: string) {
    await this.detallesDelete.delete(id);
  }

  // informacion de pago
  private async deleteDetallesServicios(id: string) {
    await this.detallesServiciosDelete.delete(id);
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
  private async deleteCitas(id: string) {
    await this.citaServiceDelete.deleteCitaForPaciente(id);
  }

  private async deleteAllHistorialClinica(id: string) {
    await this.historialClinicaDeleteServices.delete(id);
  }
  private async deleteAllApoderados(id: string) {
    await this.apoderadoDeleteServices.deleteAllApoderados(id);
  }
}
