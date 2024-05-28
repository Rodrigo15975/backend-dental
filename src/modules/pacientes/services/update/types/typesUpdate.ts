import { UpdatePacienteDto } from 'src/modules/pacientes/dto/update-paciente.dto';

export interface PacienteUpdate {
  update(id: string, updatePacienteDto: UpdatePacienteDto): Promise<void>;
}
