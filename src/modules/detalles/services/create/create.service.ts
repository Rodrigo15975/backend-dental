import { Inject, Injectable } from '@nestjs/common';
import { EstadoServicioFindService } from 'src/modules/estado-servicio/services/find/find.service';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { ServicioFindService } from 'src/modules/servicios/services/find/find.service';
import { CreateDetallesDto } from '../../dto/create-detalle.dto';
import { Detalle } from '../../entities/detalle.entity';
import {
  DETALLE_REPOSITORY,
  DetalleRepository,
} from '../../repository/detalle-repositor';
import { DetallesCreate } from './types/typesCreate';
import { ServicioUpdateService } from 'src/modules/servicios/services/update/update.service';

@Injectable()
export class DetallesCreateService implements DetallesCreate {
  constructor(
    @Inject(DETALLE_REPOSITORY)
    private readonly detalleRepository: DetalleRepository,
    private readonly medicoFindServicio: MedicoFindService,
    private readonly servicioFindServicio: ServicioFindService,
    private readonly estadoServicioFindService: EstadoServicioFindService,
    private readonly servicioUpdateServicio: ServicioUpdateService,
  ) {}
  async create(data: CreateDetallesDto): Promise<Detalle> {
    const medico = await this.medicoFindServicio.findById(data.medico);

    const servicio = await this.servicioFindServicio.findById(data.servicio);

    const estado = await this.estadoServicioFindService.findById(
      data.estado_tratamiento,
    );

    // actualiza el acount del servicio
    await this.servicioUpdateServicio.addCountByService(data.servicio);

    return await this.detalleRepository.create({
      ...data,
      estado_tratamiento: estado._id,
      medico: medico._id,
      servicio: servicio.nombre,
      costo_servicio: servicio.costo,
    });
  }
}
