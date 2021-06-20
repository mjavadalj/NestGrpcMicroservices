import {
  Body,
  Controller,
  Inject,
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
  ClientProxy,
  GrpcMethod,
} from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredential } from './auth/dto/authCredential.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
// import {
//   productMicroserviceOptions,
//   commentMicroserviceOptions,
// } from './grpc.options';
import { IGrpcService } from './grpc.interface';
import { Observable } from 'rxjs';
// @ApiBearerAuth()
@ApiTags('users')
@Controller('/user')
export class UserController implements OnModuleInit {
  private grpcService: IGrpcService;
  private grpcCommService: IGrpcService;
  constructor(
    private readonly userService: UserService,
    // @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    @Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc,
    @Inject('COMMENT_PACKAGE') private readonly clientComm: ClientGrpc,
  ) {}

  // @Client(microserviceOptions)
  // private client: ClientGrpc;

  // private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService =
      this.client.getService<IGrpcService>('ProductController');
    this.grpcCommService =
      this.clientComm.getService<IGrpcService>('ProductController');
  }

  @Post('/addcomment')
  @UseGuards(AuthGuard())
  async addComment(
    @Req() req,
    @Body('productId') id: number,
    @Body('text') text: string,
  ) {
    //: User TODO:
    try {
      const user = req.user;
      console.log('user from passport: ', { user });

      // return this.grpcService.findProduct({ id });
      const product = await this.grpcService.findProduct({ id }).toPromise();
      console.log('product: ', { product: product.name });
      const comment = await this.grpcCommService.addComment({
        text,
        user: user._id,
      });
      console.log('comment:=> ', { comment });
      return comment;
    } catch (error) {
      console.log('errrrr: ', { error });
    }
  }

  @Post('/addProduct')
  @UseGuards(AuthGuard())
  addProduct(
    @Body('id') id: number,
    @Body('name') name: string,
  ): Observable<string> {
    return this.grpcService.addProduct({ id, name });
  }

  // @Post('addProduct')
  // @UseGuards(AuthGuard())
  // addProduct(
  //   @Body('id') id: number,
  //   @Body('name') name: string,
  // ): Observable<string> {
  //   console.log(id, name);
  //   console.log('fuuuuuuuuuuuuuuuu :=>>>> ', {
  //     grpcAddProduct: this.grpcService.addProduct.toString(),
  //   });
  //   // return {
  //   //   mess: 'fuck',
  //   //   whatIsThis: this.grpcService.addProduct({ id, name }),
  //   // };
  //   return this.grpcService.addProduct({ id, name });
  // }

  // @Post('/addProduct')
  // @UseGuards(AuthGuard())
  // addProduct(@Body('id') id: number, @Body('name') name: string) {
  //   this.client.emit('addProduct', { id, name });
  //   return 'dont know yet';
  // }

  @Post('/addUser')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Add user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authCredential: AuthCredential) {
    return this.userService.login(authCredential);
  }

  // @Post('/addProduct')
  // @UseGuards(AuthGuard())
  // addProduct(@Req() req) {
  //   console.log(req);
  // }
}
