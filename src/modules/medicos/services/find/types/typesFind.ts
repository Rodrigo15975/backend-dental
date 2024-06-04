import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { MedicoRepository } from 'src/modules/medicos/repository/medico-repository';
import { PropsCreateServicioDto } from 'src/modules/servicios/dto/create-servicio.dto';

export interface MedicoFind
  extends Omit<
    MedicoRepository,
    | 'create'
    | 'delete'
    | 'update'
    | 'findOne'
    | 'updateProfile'
    | 'aggregate'
    | 'addNewServicesForMedicoWithDni'
    | 'deleteServicesForMedico'
    | 'updateServicesOfMedicos'
  > {
  findByDniExistingInMedico(dni: string): Promise<void>;
  findByEmailExistingInMedico(email: string): Promise<void>;
  findByPhoneExistingInMedico(phone: string): Promise<void>;
  findAuthByMedico(identifier: string): Promise<Medico>;
  findByIdMedico(id: string): Promise<Medico>;

  findAllServices(id: string): Promise<PropsCreateServicioDto[]>;
}
