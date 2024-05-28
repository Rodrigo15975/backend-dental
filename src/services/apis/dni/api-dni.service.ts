import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ApiDniService {
  private readonly tokenAccess: string =
    this.configService.getOrThrow('TOKEN_ACCESS');
  private readonly urlApi: string =
    this.configService.getOrThrow('URL_API_DNI');

  constructor(private readonly configService: ConfigService) {}
  async getDni(dni: string) {
    try {
      const res = await fetch(`${this.urlApi}dni?numero=${dni}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.tokenAccess}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en la petición');
    }
  }
}
