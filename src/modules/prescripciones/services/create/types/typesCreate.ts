import { CreatePrescripcioneDto } from 'src/modules/prescripciones/dto/create-prescripcione.dto';

export interface PrescripcionesCreate {
  create(
    createPrescripcioneDto: CreatePrescripcioneDto,
    id: string,
  ): Promise<void>;
}
