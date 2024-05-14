import { PipelineStage } from 'mongoose';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

export const USUARIO_REPOSITORY = 'UsuarioRepository';

export interface UsuarioRepository {
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
  aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T>;

  update(id: string, updateteUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
  updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void>;

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
