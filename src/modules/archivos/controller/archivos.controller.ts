import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArchivoDto } from '../dto/create-archivo.dto';
import { ArchivosService } from '../services/archivos.service';

@Controller('archivos')
export class ArchivosController {
  constructor(private readonly archivosService: ArchivosService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndData(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateArchivoDto,
    @Param('id') id: string,
  ) {
    return this.archivosService.create(data, file, id);
  }

  @Delete(':idDoc/:idPaciente')
  remove(
    @Param('idDoc') idDoc: string,
    @Param('idPaciente') idPaciente: string,
  ) {
    return this.archivosService.remove(idDoc, idPaciente);
  }
}
