import { ServicioRepository } from 'src/modules/servicios/repository/servicio-repository';

export interface ServicioFind
  extends Omit<
    ServicioRepository,
    'create' | 'delete' | 'update' | 'addCountByService'
  > {}
