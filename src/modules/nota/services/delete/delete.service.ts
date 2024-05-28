import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nota } from '../../entities/nota.entity';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class NotasDeleteService {
  constructor(
    @InjectModel(Nota.name) private readonly modelNotas: Model<Nota>,
    private readonly handledErrors: HandleErrors,
  ) {}
  async delete(id: string) {
    const nota = await this.modelNotas.findByIdAndDelete(id);
    if (!nota)
      this.handledErrors.handleErrorsNotFoundException(
        `Id ${id} de notas no fue encontrado`,
      );
  }
}
