import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  Client,
  ClientGrpc,
  EventPattern,
  GrpcMethod,
} from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';
// import { Metadata, ServerUnaryCall } from 'grpc';
// import { IGrpcService } from '../../user/src/grpc.interface';
import { Product } from './product.entity';

import { ProductService } from './product.service';
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductController', 'AddProduct')
  async addProduct(
    product: Product,
    metadata: Metadata,
    call: ServerUnaryCall<any>,
  ) {
    console.log('adding product: ' + product);
    return this.productService.addProduct(product);
  }
  @GrpcMethod('ProductController', 'FindProduct')
  async findProduct(
    id: number,
    metadata: Metadata,
    call: ServerUnaryCall<any>,
  ) {
    console.log('finding product: ' + id);
    return this.productService.getProduct(id);
  }

  // @EventPattern('addProduct')
  // async addProduct(product) {
  //   console.log('adding product: ' + product);
  //   return this.productService.addProduct(product);
  // }

  @Get('/getAllProducts')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/getProduct')
  async getProduct(@Body('id') id: number) {
    return this.productService.getProduct(id);
  }
}
