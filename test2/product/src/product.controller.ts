import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
const grpc = require('grpc');
import {
  Client,
  ClientGrpc,
  EventPattern,
  GrpcMethod,
  JsonSocket,
} from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Metadata, ServerUnaryCall } from 'grpc';
import { resourceLimits } from 'worker_threads';
import { IGrpcService } from './grpc.interface';
// import { Metadata, ServerUnaryCall } from 'grpc';
// import { IGrpcService } from '../../user/src/grpc.interface';
import { Product } from './product.entity';

import { ProductService } from './product.service';
@Controller('/product')
export class ProductController {
  private grpcService: IGrpcService;

  constructor(
    private readonly productService: ProductService,
    @Inject('USER_PACKAGE') private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.grpcService =
      this.client.getService<IGrpcService>('ProductController');
  }

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
  async getProduct(@Req() req, @Body('id') id: number, @Body() bd) {
    // try {
    // var macaroon = 'iahdi';
    // var metadata = new grpc.Metadata();
    // metadata.add('macaroon', macaroon);
    // console.log('req.user!: ', {
    //   user: req.headers['authorization'].split(' ')[1],
    // });
    // console.log(metadata);
    // console.log('ummmm: ', {

    var product;
    var ok = await this.grpcService
      .userAuth({ name: req.headers['authorization'].split(' ')[1] })
      .toPromise();
    // .then(async (data) => {
    //   console.log('----> ', { data });
    //   product = await this.productService.getProduct(id);
    // });

    console.log(ok.name);
    return await this.productService.getProduct(id);
    // });
    // console.log('req.user2!: ', {
    //   user: req.user,
    // });
    // } catch (error) {
    //   console.log('lsdf093:  ', { error });
    //   return { error };
    // }

    // console.log('req.user!: ', {
    //   user: req.user,
    // });
    // const test = await this.grpcService.userAuth();
    // return this.grpcService.userAuth();
    // console.log('293847283oidjsjd   *** ', { user: req.user });
    // console.log(test);
    // return this.productService.getProduct(id);
  }
}
