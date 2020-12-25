import { Resolver, Mutation, Arg } from 'type-graphql';
import { registerUserUseCase } from '../../modules/user/useCases/RegisterUser';
import { UserResponse, UserArgs } from '../types';
import { User } from '../entities/User';
// import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
// import { validateRegister } from '../utils/validateRegister';
// import { sendEmail } from '../utils/sendEmail';

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UserArgs,
    // @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const result = await registerUserUseCase.execute(options);
    if (result.isLeft()) {
      const response = { message: result.value.errorValue(), user: null };

      return response;
    }

    // req.session.userId = user.id;

    // must refactor
    return { message: { message: 'registered!' }, user: null };
  }
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: MyContext) {
  //   // this is the current user and its ok to show them their own email
  //   if (req.session.userId === user.id) {
  //     return user.email;
  //   }
  //   // current user wants to see someone elses email
  //   return "";
  // }

  // @Mutation(() => UserResponse)
  // async changePassword(
  //   @Arg("token") token: string,
  //   @Arg("newPassword") newPassword: string,
  //   @Ctx() { redis, req }: MyContext
  // ): Promise<UserResponse> {
  // }

  // @Mutation(() => Boolean)
  // async forgotPassword(
  //   @Arg("email") email: string,
  //   @Ctx() { redis }: MyContext
  // ) {
  // }

  // @Query(() => User, { nullable: true })
  // me(@Ctx() { req }: MyContext) {
  //   // you are not logged in
  //   if (!req.session.userId) {
  //     return null;
  //   }

  //   return User.findOne(req.session.userId);
  // }

  // store user id session
  // this will set a cookie on the user
  // keep them logged in

  // @Mutation(() => UserResponse)
  // async login(
  //   @Arg("usernameOrEmail") usernameOrEmail: string,
  //   @Arg("password") password: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<UserResponse> {}

  // @Mutation(() => Boolean)
  // logout(@Ctx() { req, res }: MyContext) {
  // }
}
