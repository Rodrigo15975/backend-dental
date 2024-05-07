import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

export const USUARIO_REPOSITORY = 'UsuarioRepository';

export interface UsuarioRepository {
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
  update(id: string, updateteUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
  delete(id: string): Promise<void>;

  findAllUsuarios(): Promise<Usuario[]>;

  findById(id: string): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario>;
  findByDni(dni: string): Promise<Usuario>;
  findByPhone(celular: string): Promise<Usuario>;

  findByEmailExisting(email: string): Promise<Usuario>;
  findByDniExisting(dni: string): Promise<Usuario>;
  findByPhoneExisting(celular: string): Promise<Usuario>;
}
