import { Injectable } from '@nestjs/common';
import {
  AsignarEtiquetas,
  CreateEtiquetaDto,
} from '../dto/create-etiqueta.dto';
import { EtiquetaCreateService } from './create/create.service';
import { EtiquetaFindService } from './find/find.service';
import { EtiquetaRemoveService } from './remove/remove.service';

@Injectable()
export class EtiquetasService {
  constructor(
    private readonly etiquetaCreateService: EtiquetaCreateService,
    private readonly etiquetaFindService: EtiquetaFindService,
    private readonly etiquetaRemoveService: EtiquetaRemoveService,
  ) {}
  async create(createEtiquetaDto: CreateEtiquetaDto) {
    return await this.etiquetaCreateService.create(createEtiquetaDto);
  }

  async asignarEtiqueta(asignarEtiquetaDto: AsignarEtiquetas) {
    return await this.etiquetaCreateService.asignarEtiquetas(
      asignarEtiquetaDto,
    );
  }

  async findAll() {
    return await this.etiquetaFindService.findAll();
  }

  async remove(id: string, idPaciente: string) {
    return await this.etiquetaRemoveService.remove(id, idPaciente);
  }
}
