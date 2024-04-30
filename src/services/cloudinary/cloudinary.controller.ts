import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryServices: CloudinaryService,
    // Recuerda crear otro services cloudinary o separarlo para la placa de los pacientes y las fotos del medico y usuario
    // private readonly usuariosServices: UsuariosService,
  ) {}
  @Post('/logo')
  @UseInterceptors(FileInterceptor('logo'))
  async file(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id_consultorio: string,
  ) {
    await this.cloudinaryServices.uploadFileLogo(file, id_consultorio);
  }

  @Post('/portada')
  @UseInterceptors(FileInterceptor('portada'))
  async fileConsultorio(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id_consultorio: string,
  ) {
    await this.cloudinaryServices.uploadFilePortada(file, id_consultorio);
  }

  @Patch('/portada/:id')
  async updatePortada(
    @Param('id') id_portada: string,
    @Body() data: { url: string },
  ) {
    // console.log(id_portada, data);
    return await this.cloudinaryServices.updateFilePortada(
      id_portada,
      data.url,
    );
  }
}
