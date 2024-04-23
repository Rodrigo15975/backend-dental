import { Role } from '../entities/role.entity';

export const REPOSITORY_ROLE = 'RepositoryRole';

export interface RepositoryRole {
  findRole(role: string): Promise<Role>;
  createRole(role: string): Promise<Role>;
}
