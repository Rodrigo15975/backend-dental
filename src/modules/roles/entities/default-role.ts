const enum Roles {
  USUARIO = 'USUARIO',
  PACIENTE = 'PACIENTE',
  MEDICO = 'MEDICO',
}

export type RolesKey = keyof typeof Roles;
