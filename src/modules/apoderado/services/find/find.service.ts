import { Inject, Injectable } from '@nestjs/common';
import { Data, FindApoderado } from './types/typesFind';
import {
  APODERADO_REPOSITORY,
  ApoderadoRepository,
} from '../../repository/apoderado-repository';
import { Apoderado } from '../../entities/apoderado.entity';
import { ApiDniService } from 'src/services/apis/dni/api-dni.service';

@Injectable()
export class ApoderadoFindService implements FindApoderado {
  constructor(
    @Inject(APODERADO_REPOSITORY)
    private readonly apoderadoRepository: ApoderadoRepository,
    private readonly apiDniServices: ApiDniService,
  ) {}

  async findByDni(dni: string): Promise<Apoderado> {
    return await this.verifyDni(dni);
  }

  private normalizeDataDni(dataDni: Data): Apoderado {
    return {
      nombre: dataDni.nombres,
      apellidos: `${dataDni.apellidoPaterno} ${dataDni.apellidoMaterno}`,
      dni: dataDni.numeroDocumento,
      fuenteCaptacion: '',
      email: '',
      celular: '',
    } as Apoderado;
  }

  private async verifyDni(dni: string): Promise<Apoderado> {
    const apoderado = await this.apoderadoRepository.findByDni(dni);
    if (!apoderado) return await this.getDataDni(dni);
    return apoderado;
  }

  private async getDataDni(dni: string): Promise<Apoderado> {
    const dataDni = await this.apiDniServices.getDni(dni);
    return this.normalizeDataDni(dataDni);
  }
}
