import { model, Schema } from "mongoose";
import validator from "validator";
import { IAddress, IUser } from "../interface/user.interface";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
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
  { versionKey: false, timestamps: true }
);

const User = model("User", userSchema);
export default User;
