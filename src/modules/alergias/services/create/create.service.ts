import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CreateAlergiaDto } from '../../dto/create-alergia.dto';
import { Alergia } from '../../entities/alergia.entity';

@Injectable()
export class AlergiasCreateService {
  constructor(
    @InjectModel(Alergia.name) private readonly modelAlergia: Model<Alergia>,
    private readonly hanledErrors: HandleErrors,
  ) {}
  async create(createAlergiaDto: CreateAlergiaDto) {
    return await this.modelAlergia.create(createAlergiaDto);
  }
}
