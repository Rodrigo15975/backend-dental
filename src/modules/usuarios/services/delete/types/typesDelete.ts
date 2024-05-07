export interface UsuarioDelete {
  delete(id: string): Promise<void>;
}
