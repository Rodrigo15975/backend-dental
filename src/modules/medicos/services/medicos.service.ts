import { Injectable } from '@nestjs/common';
import { AddNewServicesForMedicoWithDni } from 'src/modules/servicios/dto/create-servicio.dto';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicoCreateService } from './create/create.service';
import { MedicoDeleteService } from './delete/delete.service';
import { MedicoFindService } from './find/find.service';
import { MedicoUpdateService } from './update/update.service';

@Injectable()
export class MedicosService {
  constructor(
    private readonly medicoCreateServices: MedicoCreateService,
    private readonly medicoFindServices: MedicoFindService,
    private readonly medicoUpdateServices: MedicoUpdateService,
    private readonly medicoDeleteServices: MedicoDeleteService,
  ) {}
  async create(createMedicoDto: CreateMedicoDto) {
    return await this.medicoCreateServices.create(createMedicoDto);
  }

  async findAll() {
    return await this.medicoFindServices.findAllMedicos();
  }
  async addNewServicesForMedicoWithDni(
    servicios: AddNewServicesForMedicoWithDni,
    dni: string,
  ) {
    return await this.medicoUpdateServices.addNewServicesForMedicoWithDni(
      servicios,
      dni,
    );
  }
  async updateServicesOfMedicos(id: string, updateMedicoDto: UpdateMedicoDto) {
    return await this.medicoUpdateServices.updateServicesOfMedicos(
      id,
      updateMedicoDto,
    );
  }
  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    return await this.medicoUpdateServices.update(id, updateMedicoDto);
  }
  async updateActiveMedico(id: string) {
    return await this.medicoUpdateServices.updateActiveMedico(id);
  }
  async updateProfile(id: string, id_perfil: string, url_perfil: string) {
    return await this.medicoUpdateServices.updateProfile(
      id,
      id_perfil,
      url_perfil,
    );
  }
  async remove(id: string) {
    return await this.medicoDeleteServices.delete(id);
  }
  async findById(id: string) {
    return await this.medicoFindServices.findById(id);
  }

  async findAuthByMedico(identifier: string) {
    return await this.medicoFindServices.findAuthByMedico(identifier);
  }
}
