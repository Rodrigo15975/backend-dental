import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/common/utils/argon2/argonHash';
import { AuthData } from '../types/type-auth';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly handlesErrors: HandleErrors,
  ) {}

  async signIn(authData: AuthData) {
    const { contraseña, dni } = authData;

    // LOGICA PARA AUTH
    // const usuario = await this.usuariosServices.findByDni(dni);

    // const hash = await verifyPassword(usuario.contraseña, contraseña);
    // if (!hash)
    //   this.handlesErrors.handleErrorsBadRequestException(
    //     'Verifique sus credenciales',
    //   );
    // const token = await this.getToken(usuario.id);

    // return token;
  }

  async getToken(id: string) {
    const payload = { id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
