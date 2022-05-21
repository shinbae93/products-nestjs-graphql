import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation()
  async signup(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.usersService.create({
      username: username,
      password: password,
      roleId: 2,
    });
    return user;
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    const access_token = await this.authService.signin(user);
    return access_token;
  }
}
