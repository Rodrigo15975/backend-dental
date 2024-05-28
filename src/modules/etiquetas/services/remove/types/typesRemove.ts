export interface EtiquetaRemove {
  remove(id: string, idPaciente: string): Promise<void>;
}
