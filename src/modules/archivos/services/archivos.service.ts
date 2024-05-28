import { Injectable } from '@nestjs/common';
import { CreateArchivoDto } from '../dto/create-archivo.dto';
import { UpdateArchivoDto } from '../dto/update-archivo.dto';
import { ArchivoCreateService } from './create/create.service';

@Injectable()
export class ArchivosService {
  constructor(private readonly archivoCreateService: ArchivoCreateService) {}
  async create(
    createArchivoDto: CreateArchivoDto,
    file: Express.Multer.File,
    id: string,
  ) {
    return await this.archivoCreateService.create(createArchivoDto, file, id);
  }

  findAll() {
    return `This action returns all archivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archivo`;
  }

  update(id: number, updateArchivoDto: UpdateArchivoDto) {
    return updateArchivoDto;
  }

  remove(id: number) {
    return `This action removes a #${id} archivo`;
  }
}
