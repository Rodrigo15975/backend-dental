import { CreatePersonaDto } from 'src/common/validation/validation-persona';
import { PropsCreateServicioForMedicoDto } from 'src/modules/servicios/dto/create-servicio.dto';

// para crear los datos
export class CreateMedicoDto extends CreatePersonaDto {
  servicios: PropsCreateServicioForMedicoDto;
}

// No es necesario validarlo, ya que los datos vendran de un select
