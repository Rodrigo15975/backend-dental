import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleServices: RolesService) {}
  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.roleServices.create(data);
  }
}
