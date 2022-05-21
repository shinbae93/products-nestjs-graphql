import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { GqlAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@Resolver()
@UseGuards(new GqlAuthGuard())
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query()
  products() {
    return this.productsService.findAll();
  }

  @Query()
  product(@Args('id') id: number) {
    return this.productsService.find(id);
  }

  @Mutation()
  @Roles(Role.Admin)
  createProduct(@Args('createProduct') product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Mutation()
  // @Roles(Role.Admin)
  updateProduct(
    @Args('id') id: number,
    @Args('updateProduct') product: UpdateProductDto,
  ) {
    return this.productsService.update(id, product);
  }

  @Mutation()
  // @Roles(Role.Admin)
  deleteProduct(@Args('id') id: number) {
    return this.productsService.delete(id);
  }
}
