import { Inject, Injectable } from '@nestjs/common';
import { EstadoServicioFindService } from 'src/modules/estado-servicio/services/find/find.service';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { ServicioFindService } from 'src/modules/servicios/services/find/find.service';
import { ServicioUpdateService } from 'src/modules/servicios/services/update/update.service';
import { CreateDetallesDto } from '../../dto/create-detalle.dto';
import { Detalle } from '../../entities/detalle.entity';
import {
  DETALLE_REPOSITORY,
  DetalleRepository,
} from '../../repository/detalle-repositor';
import { DetallesCreate } from './types/typesCreate';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';

@Injectable()
export class DetallesCreateService implements DetallesCreate {
  constructor(
    @Inject(DETALLE_REPOSITORY)
    private readonly detalleRepository: DetalleRepository,
    private readonly medicoFindServicio: MedicoFindService,
    private readonly servicioFindServicio: ServicioFindService,
    private readonly estadoServicioFindService: EstadoServicioFindService,
    private readonly servicioUpdateServicio: ServicioUpdateService,
    private readonly pacienteFindService: PacienteFindService,
  ) {}

  async createTratamientoDetalles(
    data: CreateDetallesDto,
    id: string,
    idPaciente: string,
  ): Promise<Detalle> {
    const findDoc = await this.detalleRepository.findById(id);
    const paciente = await this.verifyIdPaciente(idPaciente);
    await findDoc.updateOne({
      $set: {
        docClone: true,
      },
    });

    const medico = await this.medicoFindServicio.findById(data.medico);

    const estado = await this.estadoServicioFindService.findById(
      data.estado_tratamiento,
    );

    const docDetallesTratamiento = await this.detalleRepository.create({
      ...data,
      estado_tratamiento: estado._id,
      medico: medico._id,
      monto_pagado: data.monto_pagado,
      servicio: data.servicio,
      costo_servicio: data.costo_servicio,
    });

    await docDetallesTratamiento.updateOne({
      paciente: paciente._id,
    });

    return docDetallesTratamiento;
  }
  private async verifyIdPaciente(idPaciente: string) {
    return await this.pacienteFindService.verifyId(idPaciente);
  }
  async create(data: CreateDetallesDto, idPaciente: string): Promise<Detalle> {
    const medico = await this.medicoFindServicio.findById(data.medico);
    const servicio = await this.servicioFindServicio.findById(data.servicio);
    const paciente = await this.verifyIdPaciente(idPaciente);

    const estado = await this.estadoServicioFindService.findById(
      data.estado_tratamiento,
    );
    const montoDecimal = this.createByDecimalCost(data.monto_pagado);
    const costoServicioDecimal = this.createByDecimalCost(data.costo_servicio);

    // actualiza el acount del servicio
    await this.servicioUpdateServicio.addCountByService(data.servicio);

    const docDetalles = await this.detalleRepository.create({
      ...data,
      estado_tratamiento: estado._id,
      medico: medico._id,
      monto_pagado: montoDecimal,
      servicio: servicio.nombre,
      costo_servicio: costoServicioDecimal,
    });
    await docDetalles.updateOne({
      paciente: paciente._id,
    });
    return docDetalles;
  }

  private createByDecimalCost(costo: string): string {
    return parseFloat(costo).toFixed(2);
  }
}
