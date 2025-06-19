import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import validator from "validator";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interface/user.interface";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false }
);

const userSchema = new Schema<IUser, UserInstanceMethods, UserStaticMethods>(
  {
    firstName: {
      type: String,
      required: [true, "first name keno dao nai"],
      minlength: [
        5,
        "First Name must be atleast 5 characters where got {VALUE}",
      ],
      maxlength: [
        10,
        "First Name must be maximum 10 characters where got {VALUE}",
      ],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "last name keno dao nai"],
      minlength: [
        5,
        "Last Name must be atleast 5 characters where got {VALUE}",
      ],
      maxlength: [
        10,
        "Last Name must be maximum 10 characters where got {VALUE}",
      ],
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18, got {VALUE}"],
      max: [60, "Age must be maximum 60, got {VALUE}"],
    },
    email: {
      type: String,
      unique: [true, "This existing email is found, email must be unique"],
      required: true,
      lowercase: true,
      trim: true,
      //custom email validation
      // validate: {
      //   validator: function (values) {
      //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      //     return emailRegex.test(values);
      //   },
      //   message: (props) => `${props.value} is not valid email address`,
      // },
      //build in email validation..
      validate: [validator.isEmail, "Invalid sent Email {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },
    // role: {
    //   type: String,
    //   enum: ["USER", "ADMIN"],
    //   uppercase: true,
    //   default: "USER",
    // },
    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN"],
        message: "Role is not valid, got {VALUE}",
      },
      uppercase: true,
      default: "USER",
    },
    phone: {
      type: Number,
      validate: {
        validator: function (values) {
          const phoneNumber = /^(?:880|0)1[3-9]\d{8}$/;
          return phoneNumber.test(values);
        },
        message: (props) => `${props.value} is not valid phone number`,
      },
    },
    address: { type: addressSchema },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//instance method
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

//static method
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

//document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//query middleware
userSchema.pre("find", function (next) {
  console.log("Inside pre find");
  next();
});

//document middleware
userSchema.post("save", function (doc, next) {
  console.log(`${doc.email} has been saved`);
  next();
});

//Query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

//virtual to get a value that never save in mongodb
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = model<IUser, UserStaticMethods>("User", userSchema);
export default User;
