export interface ServicioDelete {
  delete(id: string): Promise<void>;
  deleteServiceForMedico(id: string): Promise<void>;
}
