import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/common/utils/argon2/argonHash';
import { AuthData } from '../types/type-auth';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UsuarioFindService } from 'src/modules/usuarios/services/find/find.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly handlesErrors: HandleErrors,
    private readonly usuarioFindServices: UsuarioFindService,
  ) {}

  async signIn(authData: AuthData) {
    const { contraseña, dni, celular, email } = authData;
    if (dni) return await this.sigInWithDni(dni, contraseña);
    if (email) return await this.sigInWithEmail(email, contraseña);
    if (celular) return await this.sigInWithPhone(celular, contraseña);
  }
  async sigInWithPhone(celular: string, contraseña: string) {
    const usuario = await this.usuarioFindServices.findByPhone(celular);
    const password = await verifyPassword(usuario.contraseña, contraseña);

    if (!password)
      this.handlesErrors.handleErrorsBadRequestException(
        'Credenciales incorrectas',
      );
    return await this.getToken(usuario.id);
  }
  async sigInWithDni(dni: string, contraseña: string) {
    const usuario = await this.usuarioFindServices.findByDni(dni);
    const password = await verifyPassword(usuario.contraseña, contraseña);

    if (!password)
      this.handlesErrors.handleErrorsBadRequestException(
        'Credenciales incorrectas',
      );
    return await this.getToken(usuario.id);
  }
  async sigInWithEmail(email: string, contraseña: string) {
    const usuario = await this.usuarioFindServices.findByEmail(email);
    const password = await verifyPassword(usuario.contraseña, contraseña);

    if (!password)
      this.handlesErrors.handleErrorsBadRequestException(
        'Credenciales incorrectas',
      );
    return await this.getToken(usuario.id);
  }
  async getToken(id: string) {
    const payload = { id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
