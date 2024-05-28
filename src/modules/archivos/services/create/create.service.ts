import { Inject, Injectable } from '@nestjs/common';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { CreateArchivoDto } from '../../dto/create-archivo.dto';
import {
  ARCHIVO_REPOSITORY,
  ArchivoRepository,
} from '../../repository/archivo-repository';
import { ArchivoFileService } from '../file/file.service';
import { ArchivoCreate } from './types/typesCreate';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';

@Injectable()
export class ArchivoCreateService implements ArchivoCreate {
  constructor(
    @Inject(ARCHIVO_REPOSITORY)
    private readonly archivoRepository: ArchivoRepository,
    private readonly pacienteFindService: PacienteFindService,
    private readonly archivoFileService: ArchivoFileService,
    private readonly hanledErrors: HandleErrors,
    private readonly medicoFindService: MedicoFindService,
  ) {}
  async create(
    createArchivoDto: CreateArchivoDto,
    file: Express.Multer.File,
    id: string,
  ): Promise<void> {
    const { medico } = createArchivoDto;
    const findMedico = await this.medicoFindService.findById(medico);

    const paciente = await this.pacienteFindService.verifyId(id);

    const fileArchivo = await this.archivoFileService.createFile(file);

    const archivo = await this.archivoRepository.create(
      { ...createArchivoDto, medico: findMedico._id },
      fileArchivo.public_id,
      fileArchivo.secure_url,
    );

    await paciente.updateOne({
      $addToSet: {
        archivos: archivo._id,
      },
    });

    this.hanledErrors.handleSendMessage('Archivo subido exitosamente');
  }
}
