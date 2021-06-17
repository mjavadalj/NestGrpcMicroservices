"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.microserviceOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
exports.microserviceOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        package: 'product',
        protoPath: path_1.join(__dirname, 'proto/product.proto'),
        url: 'localhost:1007',
    },
};
//# sourceMappingURL=grpc.options.js.map