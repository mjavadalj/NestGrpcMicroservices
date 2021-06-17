import { BaseEntity, ObjectID } from 'typeorm';
declare enum UserType {
    NORMAL = "normal",
    VIP = "vip"
}
export declare class User extends BaseEntity {
    _id: ObjectID;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    type: UserType;
    salt: string;
    validatePassword(password: string): Promise<boolean>;
}
export {};
