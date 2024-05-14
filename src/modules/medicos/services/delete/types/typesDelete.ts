export interface MedicoDelete {
  delete(id: string): Promise<void>;
  deleteServicesForMedico(id: string): Promise<void>;
}
