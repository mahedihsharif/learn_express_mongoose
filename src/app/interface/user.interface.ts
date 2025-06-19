import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  phone: number;
  address: IAddress;
}

//instance method
export interface UserInstanceMethods {
  hashPassword(password: string): string;
}

//static method
export interface UserStaticMethods extends Model<IUser> {
  hashPassword(password: string): string;
}
