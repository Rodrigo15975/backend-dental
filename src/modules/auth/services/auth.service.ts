import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { verifyPassword } from 'src/common/utils/argon2/argonHash';
import { MedicosService } from 'src/modules/medicos/services/medicos.service';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { AuthData } from '../types/type-auth';
import { RolesKey } from 'src/modules/roles/entities/default-role';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly handlesErrors: HandleErrors,
    private readonly usuarioServices: UsuariosService,
    private readonly medicoServices: MedicosService,
  ) {}

  async signIn(authData: AuthData) {
    return await this.authMedicOrUser(authData);
  }

  async authMedicOrUser(auth: AuthData) {
    const { contraseña, identifier } = auth;
    const [usuario, medico] = await Promise.all([
      this.usuarioServices.findAuthByUsuario(identifier),
      this.medicoServices.findAuthByMedico(identifier),
    ]);
    if (usuario)
      return await this.authLogin(
        usuario.contraseña,
        contraseña,
        usuario.id,
        'USUARIO',
      );
    if (medico)
      return await this.authLogin(
        medico.contraseña,
        contraseña,
        medico.id,
        'MEDICO',
      );
    this.handlesErrors.handleErrorsBadRequestException(
      'Credenciales incorrectas',
    );
  }

  // General, auth (medico,usuario)
  private async authLogin(
    hash: string,
    contraseña: string,
    id: string,
    role: RolesKey,
  ) {
    const passwordCorrect = await verifyPassword(hash, contraseña);
    if (!passwordCorrect)
      this.handlesErrors.handleErrorsBadRequestException(
        'Credenciales incorrectas',
      );
    return await this.getToken(id, role);
  }

  private async getToken(id: string, role: RolesKey) {
    const payload = { id, role };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
