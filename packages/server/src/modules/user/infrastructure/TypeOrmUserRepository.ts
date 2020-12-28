import { EntityRepository, Repository } from 'typeorm';
import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../../../graphql/entities/User';
import { User as DomainUser } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserMapper } from './UserMapper';

@EntityRepository(User)
export class TypeOrmUserRepository
  extends Repository<User>
  implements IUserRepository {
  async confirmExistence(userEmail: UserEmail): Promise<boolean> {
    const { email } = userEmail.props;
    const result = await this.manager.findOne(User, { email });

    return !!result;
  }

  async getUserByUserId(userId: string): Promise<User | undefined> {
    const result = await this.manager.findOne(User, userId);
    if (!result) return undefined;

    return result;
  }

  async registerUser(user: DomainUser): Promise<void> {
    const confirmExistence = await this.confirmExistence(user.email);
    if (!confirmExistence) {
      const data = await UserMapper.toTypeOrm(user);
      await this.manager.save(User, {
        ...data,
      });
    }
  }

  async getUsers(): Promise<User[] | undefined> {
    const users = await this.manager.find(User);

    return users || undefined;
  }
}
