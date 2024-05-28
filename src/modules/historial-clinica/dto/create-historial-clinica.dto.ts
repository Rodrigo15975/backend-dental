import { IsBoolean, IsOptional, Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateHistorialClinicaDto {
  fecha: string;
  hora: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Enfermedad solo números y caracteres',
  })
  enfermedad: string;
  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Tiempo solo números y caracteres',
  })
  tiempo: string;
  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Sintomas solo números y caracteres',
  })
  sintomas: string;

  @IsBoolean()
  @IsOptional()
  presion_alta: boolean;

  @IsBoolean()
  @IsOptional()
  presion_baja: boolean;

  @IsBoolean()
  @IsOptional()
  hepatitis: boolean;

  @IsBoolean()
  @IsOptional()
  ulcera: boolean;

  @IsBoolean()
  @IsOptional()
  asma: boolean;

  @IsBoolean()
  @IsOptional()
  gastritis: boolean;

  @IsBoolean()
  @IsOptional()
  diabetes: boolean;

  @IsBoolean()
  @IsOptional()
  alergias: boolean;

  @IsBoolean()
  @IsOptional()
  enfermedad_sanguinea: boolean;

  @IsBoolean()
  @IsOptional()
  problemas_cardiacos: boolean;

  @IsBoolean()
  @IsOptional()
  medicina_permanente: boolean;

  @IsBoolean()
  @IsOptional()
  sangrado_encias: boolean;
}
