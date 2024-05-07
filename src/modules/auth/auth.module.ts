import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { constantsKey } from 'src/common/constants/constantsKey';
import { SharedMongodbModule } from 'src/shared/mongodb/Sharedmongodb.module';
import { AuthJwt } from './jwt/auth-jwt';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [
    SharedservicesModule,
    SharedMongodbModule,
    JwtModule.register({
      secret: constantsKey.secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthJwt, HandleErrors, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
// ACA ESTA LOS ARCHIVOS ATENRIORS ACA HACER UN NUEVO CLON DEL TEMPLATE
