const { validationResult } = require("express-validator");
const AppError = require("../errors/appError");
const validResult = (req, res, next) => {
  const errors = validationResult(req);

  //* En caso de haber errores de validacion, se lanzan error que seran manejados por el ErrorHandler que ya definimos
  if (!errors.isEmpty()) {
    throw new AppError("Validation Error", 400, errors.errors);
  }

  //* Si no hay ningun error, debe seguir con el flujo de express
  next();
};

module.exports = {
  validationResult: validResult,
};
