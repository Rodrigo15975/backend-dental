export interface ArchivoDelete {
  delete(id: string): Promise<void>;
  deleteArchivoOnePaciente(idDoc: string, idPaciente: string): Promise<void>;
}
