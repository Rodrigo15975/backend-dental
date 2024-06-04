export interface PrescripcionesDelete {
  delete(id: string): Promise<void>;
}
