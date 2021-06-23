import { ClientOptions, Transport } from '@nestjs/microservices';
import { ServerCredentials } from 'grpc';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'product',
    protoPath: join(__dirname, '../../../../proto/product.proto'),
    url: 'localhost:5002',
  },
};
