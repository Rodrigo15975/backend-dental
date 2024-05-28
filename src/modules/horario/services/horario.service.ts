import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CreateHorarioDto } from '../dto/create-horario.dto';
import { UpdateHorarioDto } from '../dto/update-horario.dto';
import { Horario } from '../entities/horario.entity';

@Injectable()
export class HorarioService {
  constructor(
    @InjectModel(Horario.name) private readonly modelHorario: Model<Horario>,
    private readonly handleErrors: HandleErrors,
  ) {}
  async create(createHorarioDto: CreateHorarioDto) {
    await this.modelHorario.create(createHorarioDto);
    this.handleErrors.handleSendMessage('Actualización exitosa..');
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

    this.handleErrors.handleSendMessage('Actualización correcta');
  }
}
