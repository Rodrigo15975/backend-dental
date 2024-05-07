import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from '../dto/create-horario.dto';
import { UpdateHorarioDto } from '../dto/update-horario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Horario } from '../entities/horario.entity';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class HorarioService {
  constructor(
    @InjectModel(Horario.name) private readonly modelHorario: Model<Horario>,
    private readonly handleErrors: HandleErrors,
  ) {}
  async create(createHorarioDto: CreateHorarioDto, id: string) {
    if (id) return await this.update(id, createHorarioDto);
    await this.modelHorario.create(createHorarioDto);
    this.handleErrors.handleSendMessage('Actualización exitosa.');
  }

  async findOne() {
    return await this.modelHorario.findOne().select(['_id', 'inicio', 'final']);
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto) {
    const horario = await this.modelHorario.findByIdAndUpdate(
      id,
      updateHorarioDto,
      {
        new: true,
      },
    );
    if (!horario)
      this.handleErrors.handleErrorsNotFoundException(
        `El id ${id}, no fue encontrado`,
      );
  }
}
