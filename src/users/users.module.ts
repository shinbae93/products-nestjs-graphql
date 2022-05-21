import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
