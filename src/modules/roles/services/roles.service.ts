import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_ROLE, RepositoryRole } from '../repository/repository-role';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @Inject(REPOSITORY_ROLE) private readonly repositoryRole: RepositoryRole,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { role } = createRoleDto;
    return await this.repositoryRole.createRole(role);
  }

  async findOne(role: string) {
    return await this.repositoryRole.findRole(role);
  }
}
