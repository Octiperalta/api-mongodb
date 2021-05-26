const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      //? El string sera el mensaje de la excepcion que saldra cuando falte el campo
      required: [true, "Name field is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname field is required"],
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: true,
      index: true,
    },
    birthday: Date,
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
    role: {
      type: String,
      required: true,
      //? En el caso de que no se asigne ningun valor al campo de ROLE, por default se le asginara 'USER_ROLE'
      default: "USER_ROLE",
      enum: ["USER_ROLE", "ADMIN_ROLE"],
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

//? Plugin necesario para el control de los campos unicos
userSchema.plugin(mongooseUniqueValidator, {
  message: "duplicated key error",
});

//? Plugin necesario para el control de los campos unicos
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
