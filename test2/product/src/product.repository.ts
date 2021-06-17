import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name } = createProductDto;

    const product = new Product();
    product.name = name;
    await product.save();

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await Product.find({});

    return products;
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const product = await Product.findOne(id);

      return product;
    } catch (error) {
      console.log('errr', { error });
    }
  }
}
