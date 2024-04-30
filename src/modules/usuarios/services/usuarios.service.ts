import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../repository/usuario-repository';
import { InjectModel } from '@nestjs/mongoose';
import { ModeloFoto } from 'src/services/cloudinary/entity';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {
  private name: string;
  private file: string;
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    @InjectModel(ModeloFoto.name) private readonly model: Model<ModeloFoto>,
  ) {}

  // verificado si los datos estan en this.name y this.file
  private async shouldCreateTodo(): Promise<boolean> {
    return !!this.name && !!this.file;
  }

  // Crea el documento una vez verificado si los datos estan en this.name y this.file
  async createtodo() {
    if (await this.shouldCreateTodo()) {
      await this.model.create({ url: this.file, name: this.name });
    }
  }

  async guardarData(data: any) {
    this.name = data.name;
    await this.createtodo();
  }

  async guardarURL(url: any) {
    this.file = url;
    await this.createtodo();
  }
  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.create(createUsuarioDto);
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
