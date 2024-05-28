import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesKey } from '../entities/default-role';
import { REPOSITORY_ROLE, RepositoryRole } from '../repository/repository-role';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class RolesService {
  constructor(
    @Inject(REPOSITORY_ROLE) private readonly repositoryRole: RepositoryRole,
    private readonly handledErrors: HandleErrors,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { role } = createRoleDto;
    return await this.repositoryRole.createRole(role);
  }

  async findOne(role: RolesKey) {
    const ROLE = await this.repositoryRole.findRole(role);
    if (!ROLE) this.handledErrors.handleSendMessage(`Role ${role} no existe`);
    return ROLE;
  }
}
