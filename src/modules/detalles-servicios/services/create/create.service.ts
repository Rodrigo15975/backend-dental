import { Inject, Injectable } from '@nestjs/common';
import { ApoderadoCreateService } from 'src/modules/apoderado/services/create/create.service';
import { CreateDetallesDto } from 'src/modules/detalles/dto/create-detalle.dto';
import { DetallesCreateService } from 'src/modules/detalles/services/create/create.service';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
} from '../../dto/create-detalles-servicio.dto';
import {
  DETALLES_SERVICIO_REPOSITORY,
  DetallesServiciosRepository,
} from '../../repository/detalles-servicios-repository';
import { DetallesServicioCreate } from './types/typesCreate';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class DetallesServicioCreateService implements DetallesServicioCreate {
  constructor(
    @Inject(DETALLES_SERVICIO_REPOSITORY)
    private readonly detallesServicioRepository: DetallesServiciosRepository,
    private readonly detalleServicioCreate: DetallesCreateService,
    private readonly pacienteFindService: PacienteFindService,
    private readonly apoderadoCreateService: ApoderadoCreateService,
    private readonly handledErrors: HandleErrors,
  ) {}

  async createDetallesPacienteMayor(
    data: CreateDetallesServicioDtoMayor,
    id: string,
  ): Promise<void> {
    const { detalles_servicio } = data;

    const paciente = await this.pacienteFindService.verifyId(id);

    const docDetalles = await this.createDetalles(detalles_servicio);

    const docDetallesServicios =
      await this.detallesServicioRepository.createDetallesPacienteMayor(data);

    for (const detalles of docDetalles) {
      await docDetallesServicios.updateOne({
        $push: {
          detalles_servicios: detalles,
        },
      });
    }
    await paciente.updateOne({
      $push: {
        historialPaciente: docDetallesServicios._id,
      },
    });

    this.handledErrors.handleSendMessage('Servicios añadido correctamente');
  }

  private async createDetalles(data: CreateDetallesDto[]) {
    const ids: string[] = [];
    for (const detalles of data) {
      const doc = await this.detalleServicioCreate.create(detalles);
      ids.push(doc._id);
    }
    return ids;
  }

  async createDetallesPacienteMenor(
    data: CreateDetallesServicioDtoMenor,
    id: string,
  ): Promise<void> {
    const { detalles_servicio, apoderado } = data;

    const paciente = await this.pacienteFindService.verifyId(id);

    const docDetalles = await this.createDetalles(detalles_servicio);

    const newApoderado = await this.apoderadoCreateService.create(apoderado);

    const docDetallesServicios =
      await this.detallesServicioRepository.createDetallesPacienteMenor(data);

    for (const detalles of docDetalles) {
      await docDetallesServicios.updateOne({
        $push: {
          detalles_servicios: detalles,
        },
      });
    }
    await paciente.updateOne({
      $push: {
        historialPaciente: docDetallesServicios._id,
        apoderado: newApoderado._id,
      },
    });

    this.handledErrors.handleSendMessage('Servicios añadido correctamente');
  }
}
