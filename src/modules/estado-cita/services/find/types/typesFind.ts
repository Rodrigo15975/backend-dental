import { EstadoCita } from 'src/modules/estado-cita/entities/estado-cita.entity';

export interface EstadoCitaFind {
  findAll(): Promise<EstadoCita[]>;
  findById(id: string): Promise<EstadoCita>;
  findCitaReprogramada(): Promise<EstadoCita>;
  findCitaListaEspera(): Promise<EstadoCita>;
  findCitaListaSala(): Promise<EstadoCita>;
  findCitaConfirmada(): Promise<EstadoCita>;
  findCitaAtendida(): Promise<EstadoCita>;
}
