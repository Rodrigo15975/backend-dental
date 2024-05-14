import { PropsCreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
import { Servicio } from '../entities/servicio.entity';

export const SERVICIO_REPOSITORY = 'ServicioRepository';

export interface ServicioRepository {
  create(createServiceDto: PropsCreateServicioDto): Promise<Servicio>;
  delete(id: string): Promise<void>;
  update(id: string, updateServiceDto: UpdateServicioDto): Promise<Servicio>;

  findAllServices(): Promise<Servicio[]>;

  findByService(nombre: string): Promise<Servicio>;
  findById(id: string): Promise<Servicio>;
  findByServiceExisting(nombre: string): Promise<Servicio>;

  addCountByService(id: string): Promise<void>;
}
