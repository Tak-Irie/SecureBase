import { ObjectType, Field, InputType, ArgsType } from 'type-graphql';
import { User } from './entities/User';

@ObjectType()
export class Message {
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => Message, { nullable: true })
  message: Message | null;

  @Field(() => User, { nullable: true })
  user: User | null;
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ArgsType()
export class UserArgs {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
