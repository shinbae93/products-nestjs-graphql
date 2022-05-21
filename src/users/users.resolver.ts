import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/products/products.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  @Query()
  users() {
    return this.usersService.findAll();
  }

  @Query()
  user(@Args('id') id: number) {
    return this.usersService.find(id);
  }

  @ResolveField()
  async product(@Parent() user: User) {
    return user.products.map((product) => {
      return this.productsService.find(product.id);
    });
  }
}
