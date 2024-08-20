import { RolesKey } from 'src/modules/roles/entities/default-role';

export class AuthData {
  identifier: string;
  contraseña: string;
}
export class AuthDataPaciente extends AuthData {}

export class User {
  id: string;
  role: RolesKey;
}
