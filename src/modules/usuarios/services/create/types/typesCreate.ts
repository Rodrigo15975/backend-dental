import { CreateUsuarioDto } from 'src/modules/usuarios/dto/create-usuario.dto';

export interface UsuarioCreate {
  create(createUsuarioDto: CreateUsuarioDto): Promise<void>;
}
