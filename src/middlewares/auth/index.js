const { check } = require("express-validator");
const express = require("express");
const AppError = require("../../errors/AppError");
const userService = require("../../services/userService");
const { validateToken, validateRole } = require("../../services/authService");
const { validationResult } = require("../commons");

const _emailRequired = check("email", "Email is required").notEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _emailExists = check("email").custom(async email => {
  const userFound = await userService.findByEmail(email);
  if (!userFound) {
    throw new AppError("The email provided does not exist in the database");
  }
});
const _passwordRequired = check("password", "Password required").notEmpty();

const postLoginRequestValitdations = [
  _emailRequired,
  _emailValid,
  //   _emailExists,
  _passwordRequired,
  validationResult,
];

//* [VALIDACION DE TOKEN]
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

//* [AUTORIZACION DE USUARIO]
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      validateRole(req.user, ...roles);
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  postLoginRequestValitdations,
  validJWT,
  hasRole,
};
