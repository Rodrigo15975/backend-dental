import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { AddNewServicesForMedicoWithDni } from 'src/modules/servicios/dto/create-servicio.dto';
import { UsuarioFindService } from 'src/modules/usuarios/services/find/find.service';
import { UpdateMedicoDto } from '../../dto/update-medico.dto';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoFindService } from '../find/find.service';
import { MedicoUpdate } from './types/typesUpdate';

@Injectable()
export class MedicoUpdateService implements MedicoUpdate {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly handleErros: HandleErrors,
    private readonly medicoFindService: MedicoFindService,
    private readonly usuarioFindService: UsuarioFindService,
  ) {}

  async updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void> {
    await this.medicoRepository.updateProfile(id, id_perfil, url_perfil);
    this.handleErros.handleSendMessage(
      'El perfil del médico fue actualizado correctamente',
    );
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<void> {
    const { celular, email } = updateMedicoDto;

    delete updateMedicoDto.role;
    delete updateMedicoDto.servicios;
    const medico = await this.medicoFindService.findById(id);

    if (email !== medico.email) await this.checkEmail(email);
    if (celular !== medico.celular) await this.checkCelular(celular);

    await this.medicoRepository.update(id, updateMedicoDto);
    this.handleErros.handleSendMessage(
      'El médico fue actualizado exitosamente',
    );
  }

  async addNewServicesForMedicoWithDni(
    newServices: AddNewServicesForMedicoWithDni,
    dni: string,
  ): Promise<void> {
    const medico = await this.medicoFindService.findByDni(dni);
    // es mejor usar un forof , para que añada los dato  a la db
    // ya que asegura que se ejecute en orden el async
    for (const value of newServices.servicios) {
      await medico.updateOne({
        // sirve para agregar campos no repetitivos
        $addToSet: {
          servicios: new Types.ObjectId(value._id),
        },
      });
    }
    this.handleErros.handleSendMessage(
      `Servicios agregados al médico ${medico.name.toUpperCase()} (No sé añadirá repetitivos)`,
    );
  }

  private async checkEmail(email: string): Promise<void> {
    await this.usuarioFindService.findByEmailExistingInUsuario(email);
    await this.medicoFindService.findByEmailExisting(email);
  }
  private async checkCelular(celular: string): Promise<void> {
    await this.usuarioFindService.findByPhoneExistingInUsuario(celular);
    await this.medicoFindService.findByPhoneExisting(celular);
  }
}
