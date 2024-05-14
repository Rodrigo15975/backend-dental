import { UpdateMedicoDto } from 'src/modules/medicos/dto/update-medico.dto';
import { AddNewServicesForMedicoWithDni } from 'src/modules/servicios/dto/create-servicio.dto';
export interface MedicoUpdate {
  update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<void>;
  updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void>;

  addNewServicesForMedicoWithDni(
    ids: AddNewServicesForMedicoWithDni,
    idMedico: string,
  ): Promise<void>;
}
