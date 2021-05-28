const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const userService = require("../../services/userService");
const { ROLES, ADMIN_ROLE } = require("../../constants");
const { validationResult } = require("../commons");
const { validJWT, hasRole } = require("../auth");

//* [POST VALIDATIONS]
const _nameRequired = check("name", "Name required").not().isEmpty();
const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _dateValid = check("birthday").optional().isDate("MM-DD-YYYY");
const _lastnameRequired = check("lastname", "Lastname required")
  .not()
  .isEmpty();
const _passwordRequired = check("password", "Password required")
  .not()
  .isEmpty();

//? Custom validation to check for valid roles
const _roleValid = check("role")
  .optional()
  .custom(async role => {
    if (!ROLES.includes(role)) {
      throw new AppError("Invalid role", 400);
    }
  });
//? Custom validation to check for duplicated emails
const _emailExists = check("email").custom(async (email = "") => {
  const userFound = await userService.findByEmail(email);
  if (userFound) {
    throw new AppError("Email already exist in the database", 400);
  }
});

//* [PUT VALIDATIONS]
const _optionalEmailValid = check("email", "Email is invalid")
  .optional()
  .isEmail();
const _optionalEmailExists = check("email")
  .optional()
  .custom(async (email = "") => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      throw new AppError("Email already exist in the database", 400);
    }
  });
const _idIsMongoDB = check("id").isMongoId();
const _idRequired = check("id").not().isEmpty();
const _idExists = check("id").custom(async (id = "") => {
  const userFound = await userService.findById(id);
  if (!userFound) {
    throw new AppError("The id provided was not found in the database", 400);
  }
});

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _lastnameRequired,
  _emailRequired,
  _emailValid,
  _emailExists,
  _passwordRequired,
  _roleValid,
  _dateValid,
  validationResult,
];
const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _roleValid,
  _dateValid,
  _optionalEmailExists,
  _optionalEmailValid,
  _idIsMongoDB,
  _idRequired,
  _idExists,
  validationResult,
];
const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idIsMongoDB,
  _idRequired,
  _idExists,
  validationResult,
];
const getByIdRequestValidations = [
  validJWT,
  _idIsMongoDB,
  _idExists,
  _idRequired,
  validationResult,
];
const getAllRequestValidations = [validJWT, validationResult];
module.exports = {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getByIdRequestValidations,
  getAllRequestValidations,
};
