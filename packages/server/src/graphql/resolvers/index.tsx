import { TestResolver } from './TestResolver';
import { UserResolver } from './UserResolver';

const resolvers = [UserResolver, TestResolver] as const;

export default resolvers;
