import { UpdateUsuarioDto } from 'src/modules/usuarios/dto/update-usuario.dto';

export interface UsuarioUpdate {
  update(updateUsuarioDto: UpdateUsuarioDto, id: string): Promise<void>;
}
