export interface TratamientoFind {
  findTopPacienteService(): Promise<FindTopPaciente>;
}

export interface FindTopPaciente {
  totalGasto: number;
  name: string;
  apellidos: string;
  dni: string;
  url_perfil: string;
}
