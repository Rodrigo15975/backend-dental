import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alergia } from '../../entities/alergia.entity';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class AlergiasDeleteService {
  constructor(
    @InjectModel(Alergia.name) private readonly modelAlergias: Model<Alergia>,
    private readonly handledErrors: HandleErrors,
  ) {}

  async delete(id: string) {
    const alergia = await this.modelAlergias.findByIdAndDelete(id);
    if (!alergia)
      this.handledErrors.handleErrorsNotFoundException(
        `id ${id} alergia no fue encontrado`,
      );
  }
}
