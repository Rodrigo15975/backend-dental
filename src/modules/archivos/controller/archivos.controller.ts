import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArchivosService } from '../services/archivos.service';
import { UpdateArchivoDto } from '../dto/update-archivo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArchivoDto } from '../dto/create-archivo.dto';

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

  @Get()
  findAll() {
    return this.archivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivosService.update(+id, updateArchivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivosService.remove(+id);
  }
}
