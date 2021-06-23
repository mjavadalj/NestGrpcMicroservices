"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const passport_1 = require("@nestjs/passport");
const authCredential_dto_1 = require("./auth/dto/authCredential.dto");
const createUser_dto_1 = require("./dto/createUser.dto");
const user_service_1 = require("./user.service");
const grpc_options_1 = require("./grpc.options");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    onModuleInit() {
        this.grpcService =
            this.client.getService('ProductController');
    }
    async addProduct(id, name) {
        console.log(id, name);
        return this.grpcService.addProduct({ id, name });
    }
    async addUser(createUserDto) {
        return this.userService.addUser(createUserDto);
    }
    async login(authCredential) {
        return this.userService.login(authCredential);
    }
};
__decorate([
    microservices_1.Client(grpc_options_1.microserviceOptions),
    __metadata("design:type", Object)
], UserController.prototype, "client", void 0);
__decorate([
    common_1.Post('addProduct'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body('id')), __param(1, common_1.Body('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addProduct", null);
__decorate([
    common_1.Post('/addUser'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.Post('/login'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authCredential_dto_1.AuthCredential]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    common_1.Controller('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map