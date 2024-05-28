import { CreateArchivoDto } from 'src/modules/archivos/dto/create-archivo.dto';

export interface ArchivoCreate {
  create(
    createArchivoDto: CreateArchivoDto,
    file: Express.Multer.File,
    id: string,
  ): Promise<void>;
}
