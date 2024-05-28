export interface ArchivoDelete {
  delete(id: string): Promise<void>;
}
