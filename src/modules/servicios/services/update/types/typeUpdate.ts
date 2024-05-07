import { UpdateServicioDto } from 'src/modules/servicios/dto/update-servicio.dto';

export interface ServicioUpdate {
  update(id: string, updateServiceDto: UpdateServicioDto): Promise<void>;
}
