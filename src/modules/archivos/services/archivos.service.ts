import { Injectable } from '@nestjs/common';
import { CreateArchivoDto } from '../dto/create-archivo.dto';
import { ArchivoCreateService } from './create/create.service';
import { ArchivoDeleteService } from './delete/delete.service';

@Injectable()
export class ArchivosService {
  constructor(
    private readonly archivoCreateService: ArchivoCreateService,

    private readonly archivosDeleteService: ArchivoDeleteService,
  ) {}
  async create(
    createArchivoDto: CreateArchivoDto,
    file: Express.Multer.File,
    id: string,
  ) {
    return await this.archivoCreateService.create(createArchivoDto, file, id);
  }

  async remove(idDoc: string, idPaciente: string) {
    return await this.archivosDeleteService.deleteArchivoOnePaciente(
      idDoc,
      idPaciente,
    );
  }
}
