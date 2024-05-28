import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateNotaDto } from '../../dto/update-nota.dto';
import { Nota } from '../../entities/nota.entity';

@Injectable()
export class NotaUpdateService {
  constructor(
    @InjectModel(Nota.name) private readonly modelNotas: Model<Nota>,
    private readonly hanledErrors: HandleErrors,
  ) {}

  async update(id: string, updateNotaDto: UpdateNotaDto) {
    await this.findById(id);
    await this.modelNotas.findByIdAndUpdate(id, updateNotaDto, {
      new: true,
    });
    this.hanledErrors.handleSendMessage('Nota asignada correctamente');
  }
  async findById(id: string) {
    const nota = await this.modelNotas.findById(id);
    if (!nota)
      this.hanledErrors.handleErrorsNotFoundException(
        `nota con ${id} id no fue encontrado `,
      );
    return nota;
  }
}
