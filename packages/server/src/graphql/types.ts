import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from './entities/User';

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  message: string | null;

  @Field(() => User, { nullable: true })
  user: User | null;
}

@ObjectType()
export class Users {
  @Field(() => String, { nullable: true })
  message: string | null;

  @Field(() => [User], { nullable: true })
  users: User[] | null;
  // @Field()
  // hasMore: boolean;
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

// @ArgsType()
// export class UserArgs {
//   @Field()
//   email: string;

//   @Field()
//   username: string;

//   @Field()
//   password: string;
// }
