export interface PacienteDelete {
  delete(id: string): Promise<void>;
  deletePacienteMenor(id: string): Promise<void>;
}
