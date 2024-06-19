import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
// Consultorio
import { ConsultarioMongoRespository } from 'src/modules/consultario/repository/consultorio-mongo-repository';
import { CONSULTARIO_REPOSITORY } from 'src/modules/consultario/repository/consultorio-repository';
import { ConsultarioService } from 'src/modules/consultario/services/consultario.service';
import { FilesConsultorioService } from 'src/modules/consultario/services/files/files.consultorio.service';

// Roles
import { MongoRepositoryRole } from 'src/modules/roles/repository/mongo-repository-role';
import { REPOSITORY_ROLE } from 'src/modules/roles/repository/repository-role';
import { RolesService } from 'src/modules/roles/services/roles.service';

// Clouidinary configuracion
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { SharedMongodbModule } from '../mongodb/Sharedmongodb.module';

// Usuarios
import { UsuarioMongoRepository } from 'src/modules/usuarios/repository/usuario-mongo-repository';
import { USUARIO_REPOSITORY } from 'src/modules/usuarios/repository/usuario-repository';
import { UsuarioCreateService } from 'src/modules/usuarios/services/create/create.service';
import { UsuarioDeleteService } from 'src/modules/usuarios/services/delete/delete.service';
import { UsuarioFindService } from 'src/modules/usuarios/services/find/find.service';
import { UsuarioUpdateService } from 'src/modules/usuarios/services/update/update.service';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
// Medicos
import { MedicoMongoRepository } from 'src/modules/medicos/repository/medico-mongo-repository';
import { MEDICO_REPOSITORY } from 'src/modules/medicos/repository/medico-repository';
import { MedicoCreateService } from 'src/modules/medicos/services/create/create.service';
import { MedicoDeleteService } from 'src/modules/medicos/services/delete/delete.service';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { MedicosService } from 'src/modules/medicos/services/medicos.service';
import { MedicoUpdateService } from 'src/modules/medicos/services/update/update.service';

// Servicios
import { ServicioMongoRespository } from 'src/modules/servicios/repository/servicio-mongo-repository';
import { SERVICIO_REPOSITORY } from 'src/modules/servicios/repository/servicio-repository';
import { ServicioCreateService } from 'src/modules/servicios/services/create/create.service';
import { ServicioDeleteService } from 'src/modules/servicios/services/delete/delete.service';
import { ServicioFindService } from 'src/modules/servicios/services/find/find.service';
import { ServiciosService } from 'src/modules/servicios/services/servicios.service';
import { ServicioUpdateService } from 'src/modules/servicios/services/update/update.service';

// config global
import { ConfigModule } from '@nestjs/config';

// Files General(medico,usuario)
import { UsuarioFileService } from 'src/modules/usuarios/services/file/file.service';
import { CloudinaryUsuarioService } from 'src/services/cloudinary-usuario/cloudinary-usuario.service';

// querys
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// asistencia
import { ASISTENCIA_REPOSITORY } from 'src/modules/asistencia/repository/asistencia-repository';
import { AsistenciaRepositoryMongo } from 'src/modules/asistencia/repository/asistencia-repository-mongo';
import { AsistenciaService } from 'src/modules/asistencia/services/asistencia.service';
import { AsistenciaCreateService } from 'src/modules/asistencia/services/create/create.service';
import { AsistenciaUpdateService } from 'src/modules/asistencia/services/update/update.service';
// Prescripciones
import { PRESCRIPCIONE_REPOSITORY } from 'src/modules/prescripciones/repository/prescripcion-repository';
import { PrescripcionesRepositoryMongo } from 'src/modules/prescripciones/repository/prescripcion-repository.mongo';
import { PrescripcionesCreateService } from 'src/modules/prescripciones/services/create/create.service';
import { PrescripcionesFindService } from 'src/modules/prescripciones/services/find/find.service';
import { PrescripcionesService } from 'src/modules/prescripciones/services/prescripciones.service';

import { PrescripcionesDeleteService } from 'src/modules/prescripciones/services/delete/delete.service';
// recetas
import { RECETA_REPOSITORY } from 'src/modules/recetas/repository/receta-repository';
import { RecetaRepositoryMongo } from 'src/modules/recetas/repository/receta-repository-mongo';
import { RecetaCreateService } from 'src/modules/recetas/services/create/create.service';
import { RecetaMedicaDeleteService } from 'src/modules/recetas/services/delete/delete.service';
import { RecetasService } from 'src/modules/recetas/services/recetas.service';

// Historial-clinica
import { HISTORIAL_CLINICA_REPOSITORY } from 'src/modules/historial-clinica/repository/historial-clinica-repository';
import { HistorialClinicaRepositoryMongo } from 'src/modules/historial-clinica/repository/historial-clinica-repository-mongo';
import { HistorialClinicoCreateService } from 'src/modules/historial-clinica/services/create/create.service';
import { HistorialClinicaDeleteService } from 'src/modules/historial-clinica/services/delete/delete.service';
import { HistorialClinicaService } from 'src/modules/historial-clinica/services/historial-clinica.service';
// apoderado
import { APODERADO_REPOSITORY } from 'src/modules/apoderado/repository/apoderado-repository';
import { ApoderadoRepositoryMongo } from 'src/modules/apoderado/repository/apoderado-repository.mongo';
import { ApoderadoService } from 'src/modules/apoderado/services/apoderado.service';
import { ApoderadoCreateService } from 'src/modules/apoderado/services/create/create.service';
import { ApoderadoDeleteService } from 'src/modules/apoderado/services/delete/delete.service';
import { ApoderadoFindService } from 'src/modules/apoderado/services/find/find.service';
import { ApoderadoUpdateService } from 'src/modules/apoderado/services/update/update.service';
// dni api
import { ApiDniService } from 'src/services/apis/dni/api-dni.service';
// etiqueta
import { EtiquetaRepositoryMongo } from 'src/modules/etiquetas/repository/etiqueta-repositor.mongo';
import { ETIQUETA_REPOSITORY } from 'src/modules/etiquetas/repository/etiqueta-repository';
import { EtiquetaCreateService } from 'src/modules/etiquetas/services/create/create.service';
import { EtiquetasService } from 'src/modules/etiquetas/services/etiquetas.service';
import { EtiquetaFindService } from 'src/modules/etiquetas/services/find/find.service';
import { EtiquetaRemoveService } from 'src/modules/etiquetas/services/remove/remove.service';
// notas y laergias
import { NotaCreateService } from 'src/modules/nota/services/create/create.service';
import { NotasDeleteService } from 'src/modules/nota/services/delete/delete.service';
import { NotaService } from 'src/modules/nota/services/nota.service';
import { NotaUpdateService } from 'src/modules/nota/services/update/update.service';

import { AlergiasService } from 'src/modules/alergias/services/alergias.service';
import { AlergiasCreateService } from 'src/modules/alergias/services/create/create.service';
import { AlergiasDeleteService } from 'src/modules/alergias/services/delete/delete.service';
import { AlergiasUpdateeService } from 'src/modules/alergias/services/update/update.service';

// archivos
import { ARCHIVO_REPOSITORY } from 'src/modules/archivos/repository/archivo-repository';
import { ArchivoRepositoryMongo } from 'src/modules/archivos/repository/archivo-repository-mongo';
import { ArchivosService } from 'src/modules/archivos/services/archivos.service';
import { ArchivoCreateService } from 'src/modules/archivos/services/create/create.service';
import { ArchivoDeleteService } from 'src/modules/archivos/services/delete/delete.service';
import { ArchivoFileService } from 'src/modules/archivos/services/file/file.service';
//pacientes
import { PACIENTE_REPOSITORY } from 'src/modules/pacientes/repository/paciente-repository';
import { PacienteRepositoryMongo } from 'src/modules/pacientes/repository/paciente-repository-mongo';
import { PacienteCreateMenorService } from 'src/modules/pacientes/services/create/create-menor.service';
import { PacienteCreateService } from 'src/modules/pacientes/services/create/create.service';
import { PacienteDeleteService } from 'src/modules/pacientes/services/delete/delete.service';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { PacientesService } from 'src/modules/pacientes/services/pacientes.service';
import { PacienteUpdateService } from 'src/modules/pacientes/services/update/update.service';

// detalles-servicios
import { DETALLES_SERVICIO_REPOSITORY } from 'src/modules/detalles-servicios/repository/detalles-servicios-repository';
import { DetallesServiciosRepositoryMongo } from 'src/modules/detalles-servicios/repository/detalles-servicios-repository-mongo';
import { DetallesServicioCreateService } from 'src/modules/detalles-servicios/services/create/create.service';
import { DetallesServicioDeleteService } from 'src/modules/detalles-servicios/services/delete/delete.service';
import { DetallesServiciosService } from 'src/modules/detalles-servicios/services/detalles-servicios.service';
import { DetallesCreateService } from 'src/modules/detalles/services/create/create.service';

// estado-servicio
import { ESTADO_SERVICIO_REPOSITORY } from 'src/modules/estado-servicio/repository/estado-servicio-repository';
import { EstadoServicioRepositoryMongo } from 'src/modules/estado-servicio/repository/estado-servicio-repository-mongo';
import { EstadoServicioCreateService } from 'src/modules/estado-servicio/services/create/create.service';
import { EstadoServicioDeleteService } from 'src/modules/estado-servicio/services/delete/delete.service';
import { EstadoServicioService } from 'src/modules/estado-servicio/services/estado-servicio.service';
import { EstadoServicioFindService } from 'src/modules/estado-servicio/services/find/find.service';
// Detalles
import { DETALLE_REPOSITORY } from 'src/modules/detalles/repository/detalle-repositor';
import { DetalleRepositoryMongo } from 'src/modules/detalles/repository/detalle-repository-mongo';
import { DetallesDeleteService } from 'src/modules/detalles/services/delete/delete.service';
import { DetallesUpdateService } from 'src/modules/detalles/services/update/update.service';
//
import { ESTADO_CITA_REPOSITORY } from 'src/modules/estado-cita/repository/estado-cita-repository';
import { EstadoCitaRepositoryMongo } from 'src/modules/estado-cita/repository/estado-cita-repository-mongo';
import { EstadoCitaCreateService } from 'src/modules/estado-cita/services/create/create.service';
import { EstadoCitaService } from 'src/modules/estado-cita/services/estado-cita.service';
import { EstadoCitaFindService } from 'src/modules/estado-cita/services/find/find.service';
//
import { CitasService } from 'src/modules/citas/services/citas.service';
import { CitaCreateService } from 'src/modules/citas/services/create/create.service';
import { CITA_REPOSITORY } from 'src/modules/citas/repository/cita-repository';
import { CitaRepositoryMongo } from 'src/modules/citas/repository/cita-repository-mongo';
import { CitaFindService } from 'src/modules/citas/services/find/find.service';
import { CitasUpdateService } from 'src/modules/citas/services/update/update.service';
import { CitaDeleteService } from 'src/modules/citas/services/delete/delete.service';
import { DetallesFindService } from 'src/modules/detalles/services/find/find.service';
//

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedMongodbModule,
    HandleErrors,
  ],
  providers: [
    // Cita
    CitasService,
    CitaFindService,
    CitasUpdateService,
    CitaDeleteService,
    CitaCreateService,
    {
      provide: CITA_REPOSITORY,
      useClass: CitaRepositoryMongo,
    },

    // Estado cita
    EstadoCitaService,
    EstadoCitaCreateService,
    EstadoCitaFindService,
    {
      provide: ESTADO_CITA_REPOSITORY,
      useClass: EstadoCitaRepositoryMongo,
    },

    // estado-tratamiento
    EstadoServicioService,
    EstadoServicioCreateService,
    EstadoServicioDeleteService,
    EstadoServicioFindService,
    {
      provide: ESTADO_SERVICIO_REPOSITORY,
      useClass: EstadoServicioRepositoryMongo,
    },

    // detalles
    DetallesCreateService,
    DetallesDeleteService,
    DetallesFindService,
    DetallesUpdateService,
    {
      provide: DETALLE_REPOSITORY,
      useClass: DetalleRepositoryMongo,
    },

    // detalles-servicios
    DetallesServicioCreateService,
    DetallesServicioDeleteService,
    DetallesServiciosService,
    {
      provide: DETALLES_SERVICIO_REPOSITORY,
      useClass: DetallesServiciosRepositoryMongo,
    },

    // pacientes
    PacientesService,
    PacienteCreateMenorService,
    PacienteCreateService,
    PacienteFindService,
    PacienteDeleteService,
    PacienteUpdateService,
    {
      provide: PACIENTE_REPOSITORY,
      useClass: PacienteRepositoryMongo,
    },

    // archivos
    ArchivoCreateService,
    ArchivosService,
    ArchivoDeleteService,
    ArchivoFileService,
    {
      provide: ARCHIVO_REPOSITORY,
      useClass: ArchivoRepositoryMongo,
    },
    //  notas
    NotaService,
    NotaCreateService,
    NotaUpdateService,
    NotasDeleteService,
    // alergias
    AlergiasService,
    AlergiasCreateService,
    AlergiasUpdateeService,
    AlergiasDeleteService,

    // eitquetas
    EtiquetasService,
    EtiquetaCreateService,
    EtiquetaFindService,
    EtiquetaRemoveService,
    {
      provide: ETIQUETA_REPOSITORY,
      useClass: EtiquetaRepositoryMongo,
    },

    // api-dni
    ApiDniService,

    // Apoderado
    ApoderadoService,
    ApoderadoFindService,
    ApoderadoDeleteService,
    ApoderadoCreateService,
    ApoderadoUpdateService,
    {
      provide: APODERADO_REPOSITORY,
      useClass: ApoderadoRepositoryMongo,
    },

    // historial-clinico
    HistorialClinicaService,
    HistorialClinicoCreateService,
    HistorialClinicaDeleteService,
    {
      provide: HISTORIAL_CLINICA_REPOSITORY,
      useClass: HistorialClinicaRepositoryMongo,
    },

    // RECETAS
    RecetasService,
    RecetaCreateService,
    RecetaMedicaDeleteService,
    {
      provide: RECETA_REPOSITORY,
      useClass: RecetaRepositoryMongo,
    },
    // prescripciones
    PrescripcionesService,
    PrescripcionesFindService,
    PrescripcionesDeleteService,
    PrescripcionesCreateService,
    {
      provide: PRESCRIPCIONE_REPOSITORY,
      useClass: PrescripcionesRepositoryMongo,
    },
    // Asistencia
    AsistenciaCreateService,
    AsistenciaUpdateService,
    AsistenciaService,
    {
      provide: ASISTENCIA_REPOSITORY,
      useClass: AsistenciaRepositoryMongo,
    },

    AggregateQuery,

    // Files General(medico,usuario)
    UsuarioFileService,
    CloudinaryUsuarioService,

    // Usuarios
    UsuarioDeleteService,
    UsuarioFindService,
    UsuarioUpdateService,
    UsuarioCreateService,
    UsuariosService,
    { provide: USUARIO_REPOSITORY, useClass: UsuarioMongoRepository },

    // Servicios
    ServiciosService,
    ServicioCreateService,
    ServicioFindService,
    ServicioDeleteService,
    ServicioUpdateService,
    { provide: SERVICIO_REPOSITORY, useClass: ServicioMongoRespository },

    // Medicos
    MedicoCreateService,
    MedicoFindService,
    MedicosService,
    MedicoUpdateService,
    MedicoDeleteService,
    { provide: MEDICO_REPOSITORY, useClass: MedicoMongoRepository },

    // Roles
    RolesService,
    { provide: REPOSITORY_ROLE, useClass: MongoRepositoryRole },

    // Errors
    HandleErrors,

    // Config logo, portada (CONSULTORIO)(CLOUDINARY)
    CloudinaryService,
    FilesConsultorioService,
    ConsultarioService,
    { provide: CONSULTARIO_REPOSITORY, useClass: ConsultarioMongoRespository },
  ],

  exports: [
    // Cita
    CitasService,
    CitasUpdateService,
    CitaFindService,
    CitaDeleteService,
    CitaCreateService,

    // Estado cita
    EstadoCitaService,
    EstadoCitaCreateService,
    EstadoCitaFindService,

    // estado-tratamiento
    EstadoServicioService,
    EstadoServicioCreateService,
    EstadoServicioDeleteService,
    EstadoServicioFindService,

    // detalles
    DetallesCreateService,
    DetallesDeleteService,
    DetallesUpdateService,
    DetallesFindService,

    // detalles-servicios
    DetallesServicioCreateService,
    DetallesServicioDeleteService,
    DetallesServiciosService,

    // pacientes
    PacientesService,
    PacienteCreateMenorService,
    PacienteCreateService,
    PacienteFindService,
    PacienteDeleteService,
    PacienteUpdateService,
    // archivos
    ArchivoCreateService,
    ArchivosService,
    ArchivoFileService,
    ArchivoDeleteService,
    // nota
    NotaService,
    NotasDeleteService,
    NotaCreateService,
    NotaUpdateService,
    // alergias
    AlergiasService,
    AlergiasDeleteService,
    AlergiasCreateService,
    AlergiasUpdateeService,

    // Etiquetas
    EtiquetasService,
    EtiquetaCreateService,
    EtiquetaFindService,
    EtiquetaRemoveService,

    // api-dni-service
    ApiDniService,

    // Apoderado
    ApoderadoService,
    ApoderadoFindService,
    ApoderadoCreateService,
    ApoderadoDeleteService,
    ApoderadoUpdateService,

    // historial-clinico
    HistorialClinicaService,
    HistorialClinicoCreateService,
    HistorialClinicaDeleteService,

    // receta
    RecetasService,
    RecetaCreateService,
    RecetaMedicaDeleteService,
    // prescripcion
    PrescripcionesService,
    PrescripcionesFindService,
    PrescripcionesCreateService,
    PrescripcionesDeleteService,

    // asistencia
    AsistenciaCreateService,
    AsistenciaUpdateService,
    AsistenciaService,

    // Agreggate
    AggregateQuery,

    // Files General(medico,usuario)
    UsuarioFileService,
    CloudinaryUsuarioService,

    // Usuarios
    UsuariosService,
    UsuarioFindService,
    UsuarioCreateService,
    UsuarioDeleteService,
    UsuarioUpdateService,

    // Servicios
    ServiciosService,
    ServicioFindService,
    ServicioCreateService,
    ServicioDeleteService,
    ServicioUpdateService,

    // Medicos
    MedicosService,
    MedicoFindService,
    MedicoCreateService,
    MedicoDeleteService,
    MedicoUpdateService,
    // Roles
    RolesService,

    // Consultorio
    ConsultarioService,
    CloudinaryService,
    FilesConsultorioService,

    SharedMongodbModule,
    // se comparte a todos
    ConfigModule,
  ],
})
export class SharedservicesModule {}
