import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cita } from '../entities/cita.entity';
import { CitaRepository } from './cita-repository';
import { CreateCitaDto } from '../dto/create-cita.dto';
import { UpdateCitaDto } from '../dto/update-cita.dto';

@Injectable()
export class CitaRepositoryMongo implements CitaRepository {
  constructor(
    @InjectModel(Cita.name) private readonly modelCita: Model<Cita>,
  ) {}
  async update(data: UpdateCitaDto, id: string): Promise<Cita> {
    return await this.modelCita.findByIdAndUpdate(id, data, { new: true });
  }
  async updateCitaChangeDate(data: UpdateCitaDto, id: string): Promise<Cita> {
    return await this.modelCita.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<Cita> {
    return await this.modelCita.findById(id);
  }

  async deleteCita(idCita: string): Promise<void> {
    return await this.modelCita.findByIdAndDelete(idCita);
  }

  async create(data: CreateCitaDto): Promise<Cita> {
    return await this.modelCita.create(data);
  }
  async findAll(): Promise<Cita[]> {
    return await this.modelCita
      .find()
      .populate({
        path: 'medico',
        select: 'name apellidos', // Selecciona solo los campos 'nombre' y 'especialidad' de 'medico'
      })
      .populate({
        path: 'estado',
        select: 'estado bg', // Selecciona solo el campo 'descripcion' de 'estado'
      })
      .populate({
        path: 'paciente',
        select: 'name apellidos dni celular', // Selecciona solo los campos 'nombre' y 'edad' de 'paciente'
      });
  }
}
