import { Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateCitaDto {
  start: string;
  end: string;
  medico: string;
  // servicio: string;
  estado: string;
  observacion: string;
  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Solo se permite letras y números',
  })

  // Datos que se eliminara
  paciente: string;
  dni: string;
  // Se usara para obtener al paciente
  idPaciente: string;
}
// dni y idPaciente, solo es referencia para mostrar en elfront los datos del paciente
// eliiminar a la hora crear la cita
