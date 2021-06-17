import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.addProduct(createProductDto);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async getProduct(id: number): Promise<Product> {
    return this.productRepository.getProduct(id);
  }
}
