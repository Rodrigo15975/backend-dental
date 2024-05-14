import { UpdateUsuarioDto } from 'src/modules/usuarios/dto/update-usuario.dto';

export interface UsuarioUpdate {
  update(updateUsuarioDto: UpdateUsuarioDto, id: string): Promise<void>;
  updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void>;
}
