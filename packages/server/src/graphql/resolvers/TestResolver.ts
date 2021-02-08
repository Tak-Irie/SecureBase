import {   Field, ObjectType, Query, Resolver } from 'type-graphql';
import { TestEntity } from '../entities/TestEntity';


@ObjectType()
export class TestResponse {
  @Field(() => String, {nullable: true})
  hello: string | null
}

@Resolver(TestEntity)
export class TestResolver {

  @Query(() => TestResponse, {nullable: true})
  authHello(): TestResponse | null {
    const hello = null

    return hello
  }

  // @Mutation(() => )
}