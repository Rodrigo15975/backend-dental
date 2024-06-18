export interface CitaDelete {
  delete(idCita: string, idPaciente: string): Promise<void>;
}
