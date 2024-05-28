import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateAlergiaDto } from '../../dto/update-alergia.dto';
import { Alergia } from '../../entities/alergia.entity';

@Injectable()
export class AlergiasUpdateeService {
  constructor(
    @InjectModel(Alergia.name) private readonly modelAlergia: Model<Alergia>,
    private readonly hanledErrors: HandleErrors,
  ) {}

  async update(id: string, updateAlergiaDto: UpdateAlergiaDto) {
    await this.findById(id);
    await this.modelAlergia.findByIdAndUpdate(id, updateAlergiaDto);
    this.hanledErrors.handleSendMessage(
      'Nota de alergia asignada correctamente',
    );
  }
  async findById(id: string) {
    const alergia = await this.modelAlergia.findById(id);
    if (!alergia)
      this.hanledErrors.handleErrorsNotFoundException(
        `Alergia con ${id} id no fue encontrado `,
      );
    return alergia;
  }
}
