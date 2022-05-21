import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
  providers: [ProductsService, ProductsResolver],
  exports: [ProductsService]
})
export class ProductsModule {}
