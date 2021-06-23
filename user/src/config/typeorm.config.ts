import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: `mongodb://localhost:27017`,
  database: 'ecomnestmicro',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
};
