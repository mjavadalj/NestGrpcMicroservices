"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
require('dotenv').config();
exports.typeOrmConfig = {
    type: 'mongodb',
    url: `mongodb://localhost:27017`,
    database: 'ecomnestmicro',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map