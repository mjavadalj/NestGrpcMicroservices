"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async addUser(createUserDto) {
        const { firstName, lastName, username, type, password } = createUserDto;
        const user = new user_entity_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.type = type;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        await user.save();
        return user;
    }
    async login(authCredential) {
        const { username, password } = authCredential;
        const user = await this.findOne({ username });
        if (user && (await user.validatePassword(password))) {
            return user;
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map