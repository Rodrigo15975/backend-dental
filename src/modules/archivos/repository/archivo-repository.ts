import { CreateArchivoDto } from '../dto/create-archivo.dto';
import { Archivo } from '../entities/archivo.entity';

export const ARCHIVO_REPOSITORY = 'ArchivoRepository';

export interface ArchivoRepository {
  create(
    createArchivoDto: CreateArchivoDto,
    id_url_archivo: string,
    url_archivo: string,
  ): Promise<Archivo>;

  delete(id: string): Promise<void>;
}
