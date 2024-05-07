export interface ServicioDelete {
  delete(id: string): Promise<void>;
}
