import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesKey } from '../entities/default-role';
import { REPOSITORY_ROLE, RepositoryRole } from '../repository/repository-role';

@Injectable()
export class RolesService {
  constructor(
    @Inject(REPOSITORY_ROLE) private readonly repositoryRole: RepositoryRole,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { role } = createRoleDto;
    return await this.repositoryRole.createRole(role);
  }

  async findOne(role: RolesKey) {
    return await this.repositoryRole.findRole(role);
  }
}
