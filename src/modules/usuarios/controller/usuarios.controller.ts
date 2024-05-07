import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UsuariosService } from '../services/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}

// para photo usuarios(medico,usuario)
// paciente va aparte
// const usuario = await this.model.create(createUsuarioDto);
// await this.usuariosService.guardarData(createUsuarioDto);

// logica de paciente placa y datos del formulario archivo
//  datos para actualizar el foto
// private name: string;
// private file: string;

// // verificado si los datos estan en this.name y this.file
// private async shouldCreateTodo(): Promise<boolean> {
//   return !!this.name && !!this.file;
// }

// // Crea el documento una vez verificado si los datos estan en this.name y this.file
// async createtodo() {
//   if (await this.shouldCreateTodo()) {
//     // await this.model.create({ url: this.file, name: this.name });
//   }
// }

// async guardarData(data: any) {
//   this.name = data.name;
//   await this.createtodo();
// }

// async guardarURL(url: any) {
//   this.file = url;
//   await this.createtodo();
// }
