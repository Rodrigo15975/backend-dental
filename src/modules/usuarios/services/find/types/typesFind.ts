import { UsuarioRepository } from 'src/modules/usuarios/repository/usuario-repository';

export interface UsuarioFind
  extends Omit<UsuarioRepository, 'create' | 'delete' | 'update'> {
  findByPhoneExistingInUsuario(celular: string): Promise<void>;
  findByEmailExistingInUsuario(email: string): Promise<void>;
  findByDniExistingInUsuario(dni: string): Promise<void>;
}
