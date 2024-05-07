import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRepository } from './usuario-repository';

@Injectable()
export class UsuarioMongoRepository implements UsuarioRepository {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async findAllUsuarios(): Promise<Usuario[]> {
    // no traer la contraseña
    return await this.usuarioModel.find().select('-contraseña');
  }
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel.create(data);
  }
  @HttpCode(204)
  async delete(id: string): Promise<void> {
    return await this.usuarioModel.findByIdAndDelete(id);
  }
  async findByDni(dni: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ dni });
  }
  async findByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email });
  }
  async findById(id: string): Promise<Usuario> {
    return await this.usuarioModel.findById(id);
  }
  async findByPhone(celular: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ celular });
  }
  async update(id: string, data: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
  }
  async findByDniExisting(dni: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ dni }).exec();
  }
  async findByEmailExisting(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email }).exec();
  }
  async findByPhoneExisting(celular: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ celular }).exec();
  }
}
