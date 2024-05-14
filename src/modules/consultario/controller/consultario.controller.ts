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
  Query,
} from '@nestjs/common';
import { ConsultarioService } from '../services/consultario.service';
import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('consultorio')
export class ConsultarioController {
  constructor(private readonly consultarioService: ConsultarioService) {}

  @Post()
  create(@Body() createConsultarioDto: CreateConsultarioDto) {
    return this.consultarioService.create(createConsultarioDto);
  }
  @Get()
  findOne() {
    return this.consultarioService.find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultarioDto: UpdateConsultarioDto,
  ) {
    return this.consultarioService.update(id, updateConsultarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultarioService.remove(id);
  }
  @Post('/logo')
  @UseInterceptors(FileInterceptor('logo'))
  async file(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id_consultorio: string,
  ) {
    return await this.consultarioService.uploadFileLogo(file, id_consultorio);
  }

  @Post('/portada')
  @UseInterceptors(FileInterceptor('portada'))
  async fileConsultorio(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id_consultorio: string,
  ) {
    return await this.consultarioService.uploadFilePortada(
      file,
      id_consultorio,
    );
  }
}
