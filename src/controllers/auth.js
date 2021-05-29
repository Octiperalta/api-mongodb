const express = require("express");
const Success = require("../handlers/successHandler");
const authService = require("../services/authService");
const logger = require("../loaders/logger");
const AppError = require("../errors/AppError");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 1) Buscar al usuario por email
    // 2) Validar la contraseña provista con la base de datos
    // 3) Generar JWT
    const jwt = await authService.login(email, password);
    res.json(new Success(jwt));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
