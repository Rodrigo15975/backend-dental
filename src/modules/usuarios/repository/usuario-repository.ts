import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

export const USUARIO_REPOSITORY = 'UsuarioRepository';

export interface UsuarioRepository {
  create(data: CreateUsuarioDto): Promise<Usuario>;
  update(id: string, data: CreateUsuarioDto): Promise<Usuario>;
  delete(id: string): Promise<Usuario>;
  findById(id: string): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario>;
  findByDni(dni: string): Promise<Usuario>;
  findByPhone(celular: string): Promise<Usuario>;
}
