import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { ApoderadoCreateService } from 'src/modules/apoderado/services/create/create.service';
import {
  CreateDetallesDto,
  CreateTratamientoDto,
} from 'src/modules/detalles/dto/create-detalle.dto';
import { DetallesCreateService } from 'src/modules/detalles/services/create/create.service';
import { Paciente } from 'src/modules/pacientes/entities/paciente.entity';
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

  // Tratamiento del servicio
  async createDetallesTratamiento(data: CreateTratamientoDto, id: string) {
    const paciente = await this.pacienteFindService.verifyId(id);
    this.deleteMontoPagadoCero(data);

    const newMontoTotal = this.obtenerNewMontoTotal(data.montoTotal);

    // detalles doc
    const detallesTratamiento = await this.createTratamientoDetalles(
      {
        ...data,
        monto_pagado: newMontoTotal,
      },
      id,
    );

    // detalles-servicios doc
    const detallesServicioTratamiento =
      await this.createTratamientoDetallesServicio(data);

    await paciente.updateOne({
      $push: {
        detalles: detallesTratamiento._id,
        detallesServicios: detallesServicioTratamiento._id,
      },
    });

    this.handledErrors.handleSendMessage(
      'Tratamiento registrado correctamente',
    );
  }
  private createByDecimalCost(costo: string): string {
    return parseFloat(costo).toFixed(2);
  }
  private deleteMontoPagadoCero(data: CreateTratamientoDto) {
    const { monto_pagado } = data;
    const montoPagadoDecimal = this.createByDecimalCost(monto_pagado);
    if (montoPagadoDecimal == '0.00') delete data.monto_pagado;
  }
  private obtenerNewMontoTotal(montoTotalTexto: string) {
    const partes = montoTotalTexto.split(':'); // Divide el texto en partes usando ':' como delimitador
    if (partes.length > 1) return partes[1].trim(); // Convierte la segunda parte de la cadena a un número

    return null; // Devuelve null si no se encuentra el delimitador ':'
  }

  // Tratamiento del servicio
  private async createTratamientoDetalles(
    data: CreateTratamientoDto,
    idPaciente: string,
  ) {
    const {
      costo_restante,
      costo_servicio,
      estado_tratamiento,
      fecha_atencion,
      medico,
      monto_pagado,
      servicio,
      id,
    } = data;

    return await this.detalleServicioCreate.createTratamientoDetalles(
      {
        costo_restante,
        costo_servicio,
        estado_tratamiento,
        fecha_atencion,
        medico,
        monto_pagado,
        servicio,
      },
      id,
      idPaciente,
    );
  }

  // Tratamiento del servicio
  private async createTratamientoDetallesServicio(data: CreateTratamientoDto) {
    const { comentarios, costo_total, montoTotal, fecha_atencion } = data;
    return await this.detallesServicioRepository.createTratamientoDetallesServicio(
      {
        comentarios,
        costo_total,
        montoTotal,
        fecha_atencion,
      },
    );
  }
  // Detalles, antes del tratamiento
  async createDetallesPacienteMayor(
    data: CreateDetallesServicioDtoMayor,
    id: string,
  ): Promise<void> {
    const { detalles_servicio } = data;

    const paciente = await this.pacienteFindService.verifyId(id);

    const docDetalles = await this.createDetalles(detalles_servicio, id);

    const docDetallesServicios =
      await this.detallesServicioRepository.createDetallesPacienteMayor(data);

    await this.assignPacienteMayorDetallesServicio(
      paciente,
      docDetallesServicios._id,
      docDetalles,
    );

    this.handledErrors.handleSendMessage('Servicios añadido correctamente');
  }

  // Detalles, antes del tratamiento
  private async createDetalles(data: CreateDetallesDto[], idPaciente: string) {
    const createPromises = data.map((detalles) =>
      this.detalleServicioCreate.create(detalles, idPaciente),
    );
    const docs = await Promise.all(createPromises);
    return docs.map((doc) => doc._id) as string[];
  }

  // Detalles, antes del tratamiento
  private async assignPacienteMayorDetallesServicio(
    paciente: Paciente,
    idDocDetallesServicio: string,
    idDocDetalles: string[],
  ) {
    await paciente.updateOne({
      $push: {
        detallesServicios: idDocDetallesServicio,
        detalles: { $each: idDocDetalles },
      },
    });
  }
  // Detalles, antes del tratamiento
  private async assignPacienteMenorDetallesServicio(
    paciente: Paciente,
    idApoderado: string,
    idDocDetallesServicio: string,
    idDocDetalles: string[],
  ) {
    await paciente.updateOne({
      $push: {
        detallesServicios: idDocDetallesServicio,
        apoderado: idApoderado,
        detalles: { $each: idDocDetalles },
      },
    });
  }

  // Detalles, antes del tratamiento
  async createDetallesPacienteMenor(
    data: CreateDetallesServicioDtoMenor,
    id: string,
  ): Promise<void> {
    const { detalles_servicio, apoderado } = data;

    const paciente = await this.pacienteFindService.verifyId(id);

    const docDetalles = await this.createDetalles(detalles_servicio, id);

    const newApoderado = await this.apoderadoCreateService.create(apoderado);

    const docDetallesServicios =
      await this.detallesServicioRepository.createDetallesPacienteMenor(data);

    await this.assignPacienteMenorDetallesServicio(
      paciente,
      newApoderado._id,
      docDetallesServicios._id,
      docDetalles,
    );

    this.handledErrors.handleSendMessage('Servicios añadido correctamente');
  }
}
