import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateEstadoTratamientoo } from 'src/modules/detalles-servicios/dto/create-detalles-servicio.dto';
import { EstadoServicioFindService } from 'src/modules/estado-servicio/services/find/find.service';
import {
  DETALLE_REPOSITORY,
  DetalleRepository,
} from '../../repository/detalle-repositor';
import { DetallesUpdate } from './types/typesUpdate';

@Injectable()
export class DetallesUpdateService implements DetallesUpdate {
  constructor(
    @Inject(DETALLE_REPOSITORY)
    private readonly detalleRepository: DetalleRepository,
    private readonly estadoServicioFindService: EstadoServicioFindService,
    private readonly handledErrors: HandleErrors,
  ) {}

  async update(data: UpdateEstadoTratamientoo): Promise<void> {
    const { idDoc, estado_tratamiento } = data;
    const docDetalles = await this.detalleRepository.findById(idDoc);
    const docEstado =
      await this.estadoServicioFindService.findById(estado_tratamiento);

    await docDetalles.updateOne({
      estado_tratamiento: docEstado._id,
    });

    this.handledErrors.handleSendMessage('Estado actualizado correctamente');
  }
}
