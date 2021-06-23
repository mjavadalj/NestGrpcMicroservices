declare enum UserType {
    NORMAL = "normal",
    VIP = "vip"
}
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    type: UserType;
    password: string;
}
export {};
