import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  async find(id: number) {
    if (!id) return null;
    const product = await Product.findOne({ id });
    return product;
  }

  findAll() {
    return Product.find();
  }

  async create(product: CreateProductDto) {
    const newProduct = Product.create(product);

    return Product.save(newProduct);
  }

  async update(id: number, newProduct: Partial<Product>) {
    const product = await Product.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, newProduct);
    console.log(product);
    
    return Product.save(product);
  }

  delete(id: number) {
    if (!id) return null;
    return Product.delete({ id });
  }
}
