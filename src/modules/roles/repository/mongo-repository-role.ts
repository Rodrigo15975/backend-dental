import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../entities/role.entity';
import { RepositoryRole } from './repository-role';
import { RolesKey } from '../entities/default-role';
@Injectable()
export class MongoRepositoryRole implements RepositoryRole {
  constructor(
    @InjectModel(Role.name) private readonly modelRole: Model<Role>,
  ) {}
  async findRole(role: RolesKey): Promise<Role> {
    return await this.modelRole.findOne({ role }).select(['_id', 'role']);
  }
  async createRole(role: RolesKey): Promise<Role> {
    return await this.modelRole.create({ role });
  }
}
