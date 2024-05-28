import { Apoderado } from 'src/modules/apoderado/entities/apoderado.entity';

export interface FindApoderado {
  findByDni(dni: string): Promise<Apoderado>;
}

export interface Data {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  numeroDocumento: string;
  digitoVerificador: string;
}
