import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { verifyPassword } from 'src/common/utils/argon2/argonHash';
import { MedicosService } from 'src/modules/medicos/services/medicos.service';
import { PacientesService } from 'src/modules/pacientes/services/pacientes.service';
import { RolesKey } from 'src/modules/roles/entities/default-role';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { AuthData, AuthDataPaciente } from '../types/type-auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly handlesErrors: HandleErrors,
    private readonly usuarioServices: UsuariosService,
    private readonly medicoServices: MedicosService,
    private readonly pacienteServices: PacientesService,
  ) {}

  async signIn(authData: AuthData) {
    return await this.authMedicOrUser(authData);
  }

  async authMedicOrUser(auth: AuthData) {
    const { contraseña, identifier } = auth;
    console.log(auth);

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

  async authPacientes(data: AuthDataPaciente) {
    const { identifier } = data;
    const paciente = await this.pacienteServices.findByDni(identifier);
    const token = await this.getToken(paciente.id, 'PACIENTE');

    return token;
  }

  private async getToken(id: string, role: RolesKey) {
    const payload = { id, role };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
