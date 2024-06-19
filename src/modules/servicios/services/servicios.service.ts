import { Injectable } from '@nestjs/common';
import { CreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
import { ServicioCreateService } from './create/create.service';
import { ServicioDeleteService } from './delete/delete.service';
import { ServicioFindService } from './find/find.service';
import { ServicioUpdateService } from './update/update.service';

@Injectable()
export class ServiciosService {
  constructor(
    private readonly servicioCreate: ServicioCreateService,
    private readonly servicioDelete: ServicioDeleteService,
    private readonly servicioUpdate: ServicioUpdateService,
    private readonly servicioFind: ServicioFindService,
  ) {}
  async create(createServicioDto: CreateServicioDto) {
    return await this.servicioCreate.create(createServicioDto);
  }
  async findOneServiceTop() {
    return await this.servicioFind.findOneServiceTop();
  }

  async findAll() {
    return await this.servicioFind.findAllServices();
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    return await this.servicioUpdate.update(id, updateServicioDto);
  }

  async remove(id: string) {
    return await this.servicioDelete.delete(id);
  }
}
